interface FighterCardProps {
    side: 'meron' | 'wala' | 'draw';
    fighter: string;
    odds: number;
    totalBets: number;
    betCount: number;
    bettingOpen?: boolean;
}

export default function FighterCard({ side, fighter, odds, totalBets, betCount, bettingOpen }: FighterCardProps) {
    const colors = {
        meron: {
            gradient: 'from-red-600 to-red-800',
            light: 'text-red-100',
            bg: 'bg-red-900/50',
        },
        wala: {
            gradient: 'from-blue-600 to-blue-800',
            light: 'text-blue-100',
            bg: 'bg-blue-900/50',
        },
        draw: {
            gradient: 'from-green-600 to-emerald-800',
            light: 'text-green-100',
            bg: 'bg-green-900/50',
        },
    };

    const color = colors[side];

    return (
        <div className={`bg-gradient-to-br ${color.gradient} rounded-3xl p-8 shadow-2xl transform transition-all hover:scale-105 relative`}>
            {/* Betting Closed Overlay */}
            {bettingOpen === false && side !== 'draw' && (
                <div className="absolute inset-0 bg-black/70 rounded-3xl flex items-center justify-center z-10">
                    <div className="text-center">
                        <div className="text-6xl mb-2">🔒</div>
                        <div className="text-3xl font-bold text-white">BETTING CLOSED</div>
                    </div>
                </div>
            )}

            <div className="text-center">
                <div className={`text-3xl font-bold mb-4 ${color.light}`}>{side.toUpperCase()}</div>
                <div className="text-7xl font-black mb-6 text-white">{Number(odds).toFixed(2)}</div>
                <div className={`text-2xl mb-4 ${color.light} ${side === 'draw' ? '' : 'truncate'}`}>
                    {side === 'draw' ? 'Even Match' : fighter}
                </div>
                <div className={`${color.bg} rounded-xl p-6 mb-4`}>
                    <div className={`text-xl ${color.light}`}>Total Bets</div>
                    <div className="text-5xl font-black text-white mt-2">₱{totalBets.toLocaleString()}</div>
                    <div className={`text-lg ${color.light} mt-2`}>{betCount} bets</div>
                </div>
            </div>
        </div>
    );
}
