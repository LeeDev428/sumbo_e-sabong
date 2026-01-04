import { Head } from '@inertiajs/react';
import DeclaratorLayout from '@/layouts/declarator-layout';

interface Fight {
    id: number;
    fight_number: string;
    meron_fighter: string;
    wala_fighter: string;
    result: 'meron' | 'wala' | 'draw' | 'cancel';
    meron_odds: number;
    wala_odds: number;
    draw_odds: number;
    event_date: string;
    declared_at: string;
    total_bets: number;
    total_payout: number;
}

interface Props {
    fights: Fight[];
}

export default function DeclaredFights({ fights }: Props) {
    const getResultBadge = (result: string) => {
        switch (result) {
            case 'meron':
                return 'bg-red-600 text-white';
            case 'wala':
                return 'bg-blue-600 text-white';
            case 'draw':
                return 'bg-green-600 text-white';
            case 'cancel':
                return 'bg-gray-600 text-white';
            default:
                return 'bg-gray-600 text-white';
        }
    };

    return (
        <DeclaratorLayout>
            <Head title="Declared Fights" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Declared Fights</h1>
                <p className="text-gray-400 mt-2">View all fights you've declared</p>
            </div>

            {fights.length === 0 ? (
                <div className="bg-gray-800 rounded-lg p-12 text-center">
                    <p className="text-gray-400 text-lg">No declared fights yet</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {fights.map((fight) => (
                        <div key={fight.id} className="bg-gray-800 rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-2xl font-bold text-yellow-400">
                                            FIGHT #{fight.fight_number}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getResultBadge(fight.result)}`}>
                                            {fight.result.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-gray-400">{fight.event_date}</p>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Declared: {new Date(fight.declared_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className={`rounded-lg p-4 text-center ${
                                    fight.result === 'meron' ? 'bg-red-600 ring-4 ring-red-400' : 'bg-gray-700'
                                }`}>
                                    <p className="text-white text-sm font-medium mb-1">MERON</p>
                                    <p className="text-white text-xl font-bold">{fight.meron_fighter}</p>
                                    <p className="text-white text-lg mt-2">×{fight.meron_odds}</p>
                                </div>

                                <div className={`rounded-lg p-4 text-center ${
                                    fight.result === 'draw' ? 'bg-green-600 ring-4 ring-green-400' : 'bg-gray-700'
                                }`}>
                                    <p className="text-white text-sm font-medium mb-1">DRAW</p>
                                    <p className="text-white text-xl font-bold">—</p>
                                    <p className="text-white text-lg mt-2">×{fight.draw_odds}</p>
                                </div>

                                <div className={`rounded-lg p-4 text-center ${
                                    fight.result === 'wala' ? 'bg-blue-600 ring-4 ring-blue-400' : 'bg-gray-700'
                                }`}>
                                    <p className="text-white text-sm font-medium mb-1">WALA</p>
                                    <p className="text-white text-xl font-bold">{fight.wala_fighter}</p>
                                    <p className="text-white text-lg mt-2">×{fight.wala_odds}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 bg-gray-700 rounded-lg p-4">
                                <div>
                                    <p className="text-gray-400 text-sm">Total Bets</p>
                                    <p className="text-white text-2xl font-bold">₱{fight.total_bets.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Total Payout</p>
                                    <p className="text-green-400 text-2xl font-bold">₱{fight.total_payout.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </DeclaratorLayout>
    );
}
