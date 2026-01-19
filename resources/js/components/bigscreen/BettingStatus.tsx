interface BettingStatusProps {
    status: string;
    meronBettingOpen?: boolean;
    walaBettingOpen?: boolean;
}

export default function BettingStatus({ status, meronBettingOpen, walaBettingOpen }: BettingStatusProps) {
    const getStatusBadge = () => {
        const badges = {
            open: { bg: 'bg-green-500', text: 'BETTING OPEN', pulse: true },
            lastcall: { bg: 'bg-yellow-500', text: 'LAST CALL', pulse: true },
            closed: { bg: 'bg-red-500', text: 'BETTING CLOSED', pulse: false },
            declared: { bg: 'bg-purple-500', text: 'RESULT DECLARED', pulse: false },
        };
        return badges[status as keyof typeof badges] || badges.open;
    };

    const statusBadge = getStatusBadge();

    return (
        <div className="flex justify-center items-center gap-6 mb-8">
            {/* Main Status */}
            <div className={`${statusBadge.bg} px-8 py-4 rounded-full shadow-2xl ${statusBadge.pulse ? 'animate-pulse' : ''}`}>
                <span className="text-3xl font-black text-white">{statusBadge.text}</span>
            </div>

            {/* Individual Side Status */}
            {(status === 'open' || status === 'lastcall') && (
                <>
                    {/* Meron Status */}
                    <div className={`px-6 py-3 rounded-full shadow-lg ${
                        meronBettingOpen 
                            ? 'bg-red-600 animate-pulse' 
                            : 'bg-gray-600'
                    }`}>
                        <span className="text-xl font-bold text-white">
                            {meronBettingOpen ? '✅ MERON OPEN' : '🔒 MERON CLOSED'}
                        </span>
                    </div>

                    {/* Wala Status */}
                    <div className={`px-6 py-3 rounded-full shadow-lg ${
                        walaBettingOpen 
                            ? 'bg-blue-600 animate-pulse' 
                            : 'bg-gray-600'
                    }`}>
                        <span className="text-xl font-bold text-white">
                            {walaBettingOpen ? '✅ WALA OPEN' : '🔒 WALA CLOSED'}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}
