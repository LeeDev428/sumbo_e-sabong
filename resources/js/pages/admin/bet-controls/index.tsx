import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';

interface Fight {
    id: number;
    fight_number: number;
    meron_fighter: string;
    wala_fighter: string;
    status: string;
    meron_odds: number;
    wala_odds: number;
    meron_betting_open: boolean;
    wala_betting_open: boolean;
    commission_percentage: number;
    total_meron_bets: number;
    total_wala_bets: number;
}

interface Props {
    fights: Fight[];
}

export default function BetControls({ fights }: Props) {
    const [selectedFight, setSelectedFight] = useState<Fight | null>(null);
    const [showCommissionModal, setShowCommissionModal] = useState(false);
    const [commission, setCommission] = useState('7.5');

    const toggleMeron = (fightId: number) => {
        router.post(`/admin/bet-controls/${fightId}/toggle-meron`, {}, {
            preserveScroll: true,
        });
    };

    const toggleWala = (fightId: number) => {
        router.post(`/admin/bet-controls/${fightId}/toggle-wala`, {}, {
            preserveScroll: true,
        });
    };

    const openCommissionModal = (fight: Fight) => {
        setSelectedFight(fight);
        setCommission(fight.commission_percentage.toString());
        setShowCommissionModal(true);
    };

    const updateCommission = () => {
        if (!selectedFight) return;

        router.post(`/admin/bet-controls/${selectedFight.id}/commission`, {
            commission_percentage: parseFloat(commission),
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setShowCommissionModal(false);
                setSelectedFight(null);
            },
        });
    };

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'standby': return 'bg-gray-600';
            case 'open': return 'bg-green-600';
            case 'lastcall': return 'bg-yellow-600';
            default: return 'bg-gray-600';
        }
    };

    return (
        <AdminLayout>
            <Head title="Bet Controls" />
<br />
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white">Bet Controls</h1>
                <p className="text-gray-400 mt-2">
                    Control which sides (Meron/Wala) can accept bets for balance management
                </p>
            </div>

            {fights.length === 0 ? (
                <div className="bg-gray-800 rounded-lg p-12 text-center">
                    <p className="text-gray-400 text-lg">No active fights available</p>
                    <p className="text-gray-500 mt-2">Fights that are in standby, open, or last call will appear here</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {fights.map((fight) => {
                        const totalBets = fight.total_meron_bets + fight.total_wala_bets;
                        const meronPercentage = totalBets > 0 ? (fight.total_meron_bets / totalBets) * 100 : 50;
                        const walaPercentage = totalBets > 0 ? (fight.total_wala_bets / totalBets) * 100 : 50;

                        return (
                            <div key={fight.id} className="bg-gray-800 rounded-lg p-6">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">
                                            Fight #{fight.fight_number}
                                        </h3>
                                        <div className="flex gap-3 mt-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(fight.status)}`}>
                                                {fight.status.toUpperCase()}
                                            </span>
                                            <button
                                                onClick={() => openCommissionModal(fight)}
                                                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-full text-xs font-semibold text-white"
                                            >
                                                Commission: {fight.commission_percentage}%
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-gray-400 text-sm">Total Pot</div>
                                        <div className="text-2xl font-bold text-white">
                                            ₱{totalBets.toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                {/* Bet Distribution Visual */}
                                <div className="mb-6">
                                    <div className="flex h-12 rounded-lg overflow-hidden">
                                        <div 
                                            className="bg-red-600 flex items-center justify-center text-white font-bold transition-all"
                                            style={{ width: `${meronPercentage}%` }}
                                        >
                                            {meronPercentage > 15 && `${meronPercentage.toFixed(0)}%`}
                                        </div>
                                        <div 
                                            className="bg-blue-600 flex items-center justify-center text-white font-bold transition-all"
                                            style={{ width: `${walaPercentage}%` }}
                                        >
                                            {walaPercentage > 15 && `${walaPercentage.toFixed(0)}%`}
                                        </div>
                                    </div>
                                </div>

                                {/* Control Panels */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* MERON Controls */}
                                    <div className={`border-2 rounded-lg p-4 transition-all ${
                                        fight.meron_betting_open 
                                            ? 'border-red-600 bg-red-900/20' 
                                            : 'border-gray-600 bg-gray-700/50'
                                    }`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="text-red-400 font-bold text-lg mb-1">MERON</h4>
                                                <p className="text-white font-semibold">{fight.meron_fighter}</p>
                                                <p className="text-gray-400 text-sm mt-1">Odds: {fight.meron_odds || 'N/A'}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-gray-400 text-xs">Total Bets</div>
                                                <div className="text-white font-bold text-lg">
                                                    ₱{fight.total_meron_bets.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => toggleMeron(fight.id)}
                                            className={`w-full py-3 rounded-lg font-bold transition-all ${
                                                fight.meron_betting_open
                                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                                    : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                                            }`}
                                        >
                                            {fight.meron_betting_open ? '✅ ACCEPTING BETS' : '🔒 BETTING CLOSED'}
                                        </button>

                                        {!fight.meron_betting_open && (
                                            <p className="text-yellow-400 text-xs mt-2 text-center">
                                                ⚠️ Tellers cannot bet on Meron
                                            </p>
                                        )}
                                    </div>

                                    {/* WALA Controls */}
                                    <div className={`border-2 rounded-lg p-4 transition-all ${
                                        fight.wala_betting_open 
                                            ? 'border-blue-600 bg-blue-900/20' 
                                            : 'border-gray-600 bg-gray-700/50'
                                    }`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="text-blue-400 font-bold text-lg mb-1">WALA</h4>
                                                <p className="text-white font-semibold">{fight.wala_fighter}</p>
                                                <p className="text-gray-400 text-sm mt-1">Odds: {fight.wala_odds || 'N/A'}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-gray-400 text-xs">Total Bets</div>
                                                <div className="text-white font-bold text-lg">
                                                    ₱{fight.total_wala_bets.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => toggleWala(fight.id)}
                                            className={`w-full py-3 rounded-lg font-bold transition-all ${
                                                fight.wala_betting_open
                                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                    : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                                            }`}
                                        >
                                            {fight.wala_betting_open ? '✅ ACCEPTING BETS' : '🔒 BETTING CLOSED'}
                                        </button>

                                        {!fight.wala_betting_open && (
                                            <p className="text-yellow-400 text-xs mt-2 text-center">
                                                ⚠️ Tellers cannot bet on Wala
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Commission Modal */}
            {showCommissionModal && selectedFight && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Set Commission Percentage
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Fight #{selectedFight.fight_number}: {selectedFight.meron_fighter} vs {selectedFight.wala_fighter}
                        </p>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2 text-gray-300">
                                Commission Percentage (%)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="100"
                                value={commission}
                                onChange={(e) => setCommission(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white text-lg"
                            />
                            <p className="text-gray-500 text-xs mt-2">
                                Default is 7.5%. This will be deducted from the total pot before payout.
                            </p>
                        </div>

                        {/* Example Calculation */}
                        {selectedFight.total_meron_bets + selectedFight.total_wala_bets > 0 && (
                            <div className="bg-gray-700/50 rounded-lg p-4 mb-6 text-sm">
                                <p className="text-gray-400 mb-2">Example with current pot:</p>
                                <div className="space-y-1 text-gray-300">
                                    <div className="flex justify-between">
                                        <span>Total Pot:</span>
                                        <span className="font-semibold">
                                            ₱{(selectedFight.total_meron_bets + selectedFight.total_wala_bets).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-purple-400">
                                        <span>Commission ({commission}%):</span>
                                        <span className="font-semibold">
                                            ₱{((selectedFight.total_meron_bets + selectedFight.total_wala_bets) * (parseFloat(commission) / 100)).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-t border-gray-600 pt-1 mt-1">
                                        <span>Net Pot:</span>
                                        <span className="font-semibold text-green-400">
                                            ₱{((selectedFight.total_meron_bets + selectedFight.total_wala_bets) * (1 - parseFloat(commission) / 100)).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowCommissionModal(false);
                                    setSelectedFight(null);
                                }}
                                className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={updateCommission}
                                className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
                            >
                                Update Commission
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
