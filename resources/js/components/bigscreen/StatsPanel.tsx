interface StatsPanelProps {
    totalPot: number;
    commission: number;
    commissionPercentage?: number;
    netPot: number;
}

export default function StatsPanel({ totalPot, commission, commissionPercentage = 7.5, netPot }: StatsPanelProps) {
    return (
        <div className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 rounded-xl p-4 mb-4 shadow-xl">
            <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                    <div className="text-lg font-bold text-yellow-100">TOTAL POT</div>
                    <div className="text-4xl font-black text-white mt-1">₱{totalPot.toLocaleString()}</div>
                </div>
                <div>
                    <div className="text-lg font-bold text-yellow-100">Commission ({commissionPercentage}%)</div>
                    <div className="text-4xl font-bold text-yellow-200 mt-1">₱{commission.toLocaleString()}</div>
                </div>
                <div>
                    <div className="text-lg font-bold text-yellow-100">Net Pot</div>
                    <div className="text-4xl font-bold text-white mt-1">₱{netPot.toLocaleString()}</div>
                </div>
            </div>
        </div>
    );
}
