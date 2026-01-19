interface HistoryFight {
    fight_number: number;
    result: string;
}

interface HistoryStripProps {
    history: HistoryFight[];
}

export default function HistoryStrip({ history }: HistoryStripProps) {
    if (history.length === 0) return null;

    const getResultBg = (result: string) => {
        return result === 'meron' ? 'bg-red-500' : 
               result === 'wala' ? 'bg-blue-500' : 
               result === 'draw' ? 'bg-green-500' : 'bg-gray-500';
    };

    return (
        <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-3xl font-bold mb-4 text-gray-300">Recent Results</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
                {history.map((h, idx) => (
                    <div
                        key={idx}
                        className={`${getResultBg(h.result)} rounded-xl px-6 py-4 flex-shrink-0 shadow-lg transform hover:scale-110 transition-all`}
                    >
                        <div className="text-sm text-white/70">Fight #{h.fight_number}</div>
                        <div className="text-2xl font-bold text-white uppercase">{h.result}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
