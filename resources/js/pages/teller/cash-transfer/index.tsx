import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface Teller {
    id: number;
    name: string;
    email: string;
}

interface Transfer {
    id: number;
    from_teller: { id: number; name: string };
    to_teller: { id: number; name: string };
    amount: number;
    remarks: string | null;
    created_at: string;
}

interface Props {
    tellers: Teller[];
    transfers: Transfer[];
    currentBalance: number;
}

export default function CashTransfer({ tellers, transfers, currentBalance }: Props) {
    const [selectedTeller, setSelectedTeller] = useState('');
    const [amount, setAmount] = useState('');
    const [remarks, setRemarks] = useState('');

    const handleTransfer = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedTeller || !amount) return;

        if (parseFloat(amount) > currentBalance) {
            alert('Insufficient balance!');
            return;
        }

        router.post('/teller/cash-transfer', {
            to_teller_id: parseInt(selectedTeller),
            amount: parseFloat(amount),
            remarks,
        }, {
            onSuccess: () => {
                setSelectedTeller('');
                setAmount('');
                setRemarks('');
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <Head title="Cash Transfer" />

            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={() => router.visit('/teller/dashboard')}
                    className="mb-4 px-3 sm:px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm sm:text-base"
                >
                    ← Back to Dashboard
                </button>
                <h1 className="text-2xl sm:text-3xl font-bold">Cash Transfer</h1>
                <p className="text-sm sm:text-base text-gray-400 mt-2">Transfer cash to other tellers</p>
            </div>

            {/* Current Balance Card */}
            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 mb-6">
                <div className="text-green-200 text-sm mb-2">Your Current Balance</div>
                <div className="text-5xl font-bold text-white">
                    ₱{currentBalance.toLocaleString()}
                </div>
            </div>

            {/* Transfer Form */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Transfer Cash</h2>
                <form onSubmit={handleTransfer} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                            Transfer To
                        </label>
                        <select
                            value={selectedTeller}
                            onChange={(e) => setSelectedTeller(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-lg"
                            required
                        >
                            <option value="">Select Teller</option>
                            {tellers.map((teller) => (
                                <option key={teller.id} value={teller.id}>
                                    {teller.name} ({teller.email})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                            Amount (₱)
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-2xl"
                            step="0.01"
                            min="0.01"
                            max={currentBalance}
                            required
                        />
                        {parseFloat(amount) > currentBalance && (
                            <p className="text-red-400 text-sm mt-1">
                                Amount exceeds your balance!
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                            Remarks (Optional)
                        </label>
                        <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                            rows={3}
                            placeholder="e.g., Cash needed for betting"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!selectedTeller || !amount || parseFloat(amount) > currentBalance}
                        className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-bold text-xl"
                    >
                        Transfer ₱{amount || '0'}
                    </button>
                </form>
            </div>

            {/* Transfer History */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-700 border-b border-gray-600">
                    <h2 className="text-xl font-bold">Your Transfer History</h2>
                </div>
                <div className="divide-y divide-gray-700">
                    {transfers.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">
                            No transfers yet
                        </div>
                    ) : (
                        transfers.map((transfer) => {
                            const currentTellerId = (window as any).authUserId;
                            const isSent = transfer.from_teller.id === currentTellerId;
                            
                            return (
                                <div key={transfer.id} className="p-4 hover:bg-gray-700/50">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    isSent ? 'bg-red-600' : 'bg-green-600'
                                                }`}>
                                                    {isSent ? 'SENT' : 'RECEIVED'}
                                                </span>
                                                <span className="text-white font-semibold">
                                                    {isSent ? `To: ${transfer.to_teller.name}` : `From: ${transfer.from_teller.name}`}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-400 mt-1">
                                                {new Date(transfer.created_at).toLocaleString()}
                                            </div>
                                            {transfer.remarks && (
                                                <div className="text-sm text-gray-400 mt-1">
                                                    {transfer.remarks}
                                                </div>
                                            )}
                                        </div>
                                        <div className={`text-2xl font-bold ${isSent ? 'text-red-400' : 'text-green-400'}`}>
                                            {isSent ? '-' : '+'}₱{transfer.amount.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
