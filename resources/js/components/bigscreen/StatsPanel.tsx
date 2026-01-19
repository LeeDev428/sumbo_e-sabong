interface StatsPanelProps {
    totalPot: number;
    commission: number;
    commissionPercentage?: number;
    netPot: number;
}

export default function StatsPanel({ totalPot, commission, commissionPercentage = 7.5, netPot }: StatsPanelProps) {
    return (
        <div className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 rounded-2xl p-8 mb-8 shadow-2xl">
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-3xl font-bold text-yellow-100">TOTAL POT</div>
                    <div className="text-7xl font-black text-white mt-2">₱{totalPot.toLocaleString()}</div>
                </div>
                <div className="text-right">
                    <div className="text-xl text-yellow-100">Commission ({commissionPercentage}%)</div>
                    <div className="text-4xl font-bold text-yellow-200 mt-2">₱{commission.toLocaleString()}</div>
                    <div className="text-xl text-yellow-100 mt-4">Net Pot</div>
                    <div className="text-4xl font-bold text-white mt-2">₱{netPot.toLocaleString()}</div>
                </div>
            </div>
        </div>
    );
}
