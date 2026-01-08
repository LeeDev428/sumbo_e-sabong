import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface FightData {
    id: number;
    fight_number: number;
    meron_fighter: string;
    wala_fighter: string;
    status: string;
    result?: string;
    meron_odds: number;
    wala_odds: number;
    draw_odds: number;
    meron_total: number;
    wala_total: number;
    draw_total: number;
    total_pot: number;
    meron_betting_open?: boolean;
    wala_betting_open?: boolean;
}

export default function BigScreen() {
    const [fight, setFight] = useState<FightData | null>(null);
    const [loading, setLoading] = useState(true);
    const [showWinner, setShowWinner] = useState(false);

    useEffect(() => {
        // Initial fetch
        fetchFight();

        // Poll every 2 seconds
        const interval = setInterval(fetchFight, 2000);

        return () => clearInterval(interval);
    }, []);

    const fetchFight = async () => {
        try {
            const response = await axios.get('/api/bigscreen');
            const newFight = response.data.fight;
            
            // Check if result was just declared
            if (newFight && newFight.status === 'declared' && (!fight || fight.status !== 'declared')) {
                setShowWinner(true);
                setTimeout(() => setShowWinner(false), 10000); // Show for 10 seconds
            }
            
            setFight(newFight);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching fight data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-4xl">Loading...</div>
            </div>
        );
    }

    if (!fight) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
                <Head title="Big Screen - eSabong" />
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-white mb-4">eSabong</h1>
                    <p className="text-3xl text-gray-400">No Active Fight</p>
                    <p className="text-xl text-gray-500 mt-4">Please wait for the next fight...</p>
                </div>
            </div>
        );
    }

    const meronPercentage = fight.total_pot > 0 ? (fight.meron_total / fight.total_pot) * 100 : 0;
    const walaPercentage = fight.total_pot > 0 ? (fight.wala_total / fight.total_pot) * 100 : 0;

    const getStatusColor = () => {
        switch (fight.status) {
            case 'open': return 'bg-green-600';
            case 'lastcall': return 'bg-yellow-600 animate-pulse';
            case 'declared': return 'bg-purple-600';
            default: return 'bg-gray-600';
        }
    };

    const getStatusText = () => {
        switch (fight.status) {
            case 'open': return 'BETTING OPEN';
            case 'lastcall': return 'LAST CALL!';
            case 'declared': return 'RESULT DECLARED';
            default: return fight.status.toUpperCase();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">
            <Head title={`Fight #${fight.fight_number} - Big Screen`} />

            {/* Status Bar */}
            <div className={`${getStatusColor()} px-8 py-4 rounded-lg mb-6 text-center`}>
                <div className="text-4xl font-bold tracking-wider">{getStatusText()}</div>
            </div>

            {/* Fight Number */}
            <div className="text-center mb-8">
                <div className="text-6xl font-bold text-orange-500">FIGHT #{fight.fight_number}</div>
            </div>

            {/* Winner Animation */}
            {showWinner && fight.result && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fadeIn">
                    <div className="text-center">
                        <div className="text-8xl font-bold mb-8 animate-bounce">
                            {fight.result === 'meron' && <span className="text-red-500">MERON WINS! 🏆</span>}
                            {fight.result === 'wala' && <span className="text-blue-500">WALA WINS! 🏆</span>}
                            {fight.result === 'draw' && <span className="text-green-500">DRAW! 🤝</span>}
                            {fight.result === 'cancelled' && <span className="text-gray-500">CANCELLED ❌</span>}
                        </div>
                        {fight.result !== 'cancelled' && fight.result !== 'draw' && (
                            <div className="text-4xl text-white">
                                {fight.result === 'meron' ? fight.meron_fighter : fight.wala_fighter}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Fighters Display */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                {/* MERON */}
                <div className={`bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-8 relative ${!fight.meron_betting_open && fight.status !== 'declared' ? 'opacity-60' : ''}`}>
                    {!fight.meron_betting_open && fight.status !== 'declared' && (
                        <div className="absolute top-4 right-4 bg-black/70 px-4 py-2 rounded-full text-sm font-bold">
                            🔒 CLOSED
                        </div>
                    )}
                    <div className="text-3xl font-bold mb-4">MERON</div>
                    <div className="text-6xl font-black mb-6 truncate">{fight.meron_fighter}</div>
                    <div className="bg-red-900/50 rounded-xl p-4 mb-4">
                        <div className="text-lg mb-2">ODDS</div>
                        <div className="text-7xl font-bold">{Number(fight.meron_odds).toFixed(2)}x</div>
                    </div>
                    <div className="bg-red-900/50 rounded-xl p-4">
                        <div className="text-lg mb-2">TOTAL BETS</div>
                        <div className="text-5xl font-bold">₱{fight.meron_total.toLocaleString()}</div>
                        <div className="text-xl mt-2 text-red-200">
                            {meronPercentage.toFixed(1)}% of pot
                        </div>
                    </div>
                </div>

                {/* DRAW */}
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-8 flex flex-col justify-center">
                    <div className="text-center">
                        <div className="text-4xl font-bold mb-4">DRAW</div>
                        <div className="bg-green-900/50 rounded-xl p-6 mb-4">
                            <div className="text-lg mb-2">ODDS</div>
                            <div className="text-8xl font-bold">{Number(fight.draw_odds).toFixed(2)}x</div>
                        </div>
                        <div className="bg-green-900/50 rounded-xl p-4">
                            <div className="text-lg mb-2">TOTAL</div>
                            <div className="text-4xl font-bold">₱{fight.draw_total.toLocaleString()}</div>
                        </div>
                    </div>
                </div>

                {/* WALA */}
                <div className={`bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 relative ${!fight.wala_betting_open && fight.status !== 'declared' ? 'opacity-60' : ''}`}>
                    {!fight.wala_betting_open && fight.status !== 'declared' && (
                        <div className="absolute top-4 right-4 bg-black/70 px-4 py-2 rounded-full text-sm font-bold">
                            🔒 CLOSED
                        </div>
                    )}
                    <div className="text-3xl font-bold mb-4">WALA</div>
                    <div className="text-6xl font-black mb-6 truncate">{fight.wala_fighter}</div>
                    <div className="bg-blue-900/50 rounded-xl p-4 mb-4">
                        <div className="text-lg mb-2">ODDS</div>
                        <div className="text-7xl font-bold">{Number(fight.wala_odds).toFixed(2)}x</div>
                    </div>
                    <div className="bg-blue-900/50 rounded-xl p-4">
                        <div className="text-lg mb-2">TOTAL BETS</div>
                        <div className="text-5xl font-bold">₱{fight.wala_total.toLocaleString()}</div>
                        <div className="text-xl mt-2 text-blue-200">
                            {walaPercentage.toFixed(1)}% of pot
                        </div>
                    </div>
                </div>
            </div>

            {/* Total Pot */}
            <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-600 rounded-2xl p-8 text-center">
                <div className="text-3xl font-bold mb-4">TOTAL POT</div>
                <div className="text-8xl font-black">₱{fight.total_pot.toLocaleString()}</div>
            </div>

            {/* Bet Distribution Bar */}
            <div className="mt-6">
                <div className="h-16 rounded-full overflow-hidden flex">
                    <div 
                        className="bg-red-500 flex items-center justify-center text-2xl font-bold transition-all duration-500"
                        style={{ width: `${meronPercentage}%` }}
                    >
                        {meronPercentage > 15 && `${meronPercentage.toFixed(0)}%`}
                    </div>
                    <div 
                        className="bg-green-500 flex items-center justify-center text-xl font-bold transition-all duration-500"
                        style={{ width: `${fight.draw_total > 0 ? ((fight.draw_total / fight.total_pot) * 100) : 0}%` }}
                    >
                        {fight.draw_total > 0 && fight.total_pot > 0 && ((fight.draw_total / fight.total_pot) * 100) > 5 && 'DRAW'}
                    </div>
                    <div 
                        className="bg-blue-500 flex items-center justify-center text-2xl font-bold transition-all duration-500"
                        style={{ width: `${walaPercentage}%` }}
                    >
                        {walaPercentage > 15 && `${walaPercentage.toFixed(0)}%`}
                    </div>
                </div>
            </div>
        </div>
    );
}
