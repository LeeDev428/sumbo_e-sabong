interface FightHeaderProps {
    fightNumber: number;
    venue?: string;
    eventName?: string;
    eventDate?: string;
    roundNumber?: number;
    matchType?: string;
}

export default function FightHeader({ fightNumber, venue, eventName, eventDate, roundNumber, matchType }: FightHeaderProps) {
    return (
        <div className="text-center mb-4">
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 mb-2">
                FIGHT #{fightNumber}
            </h1>
            {eventName && (
                <div className="text-2xl font-bold text-gray-300 mb-1">{eventName}</div>
            )}
            {eventDate && (
                <div className="text-lg text-gray-400 mb-1">
                    📅 {new Date(eventDate).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                </div>
            )}
            <div className="flex justify-center gap-4 text-lg text-gray-400">
                {venue && <span>📍 {venue}</span>}
                {roundNumber && <span>🥊 Round {roundNumber}</span>}
                {matchType && matchType !== 'regular' && (
                    <span className="px-3 py-0.5 bg-purple-600 rounded-full text-white uppercase text-sm">
                        {matchType}
                    </span>
                )}
            </div>
        </div>
    );
}
