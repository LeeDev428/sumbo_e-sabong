import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface Bet {
    id: number;
    fight: {
        id: number;
        fight_number: number;
        meron_fighter: string;
        wala_fighter: string;
        result: string | null;
    };
    side: string;
    amount: number;
    odds: number;
    potential_payout: number;
    actual_payout: number | null;
    status: string;
    created_at: string;
}

interface Props {
    bets: {
        data: Bet[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        fight_number?: string;
        side?: string;
        status?: string;
        start_date?: string;
        end_date?: string;
        search?: string;
    };
    fightNumbers: number[];
}

export default function BetHistory({ bets, filters = {}, fightNumbers }: Props) {
    const [fightNumber, setFightNumber] = useState(filters.fight_number || '');
    const [side, setSide] = useState(filters.side || '');
    const [status, setStatus] = useState(filters.status || '');
    const [startDate, setStartDate] = useState(filters.start_date || '');
    const [endDate, setEndDate] = useState(filters.end_date || '');
    const [search, setSearch] = useState(filters.search || '');

    const applyFilters = () => {
        router.get('/teller/bets', {
            fight_number: fightNumber,
            side,
            status,
            start_date: startDate,
            end_date: endDate,
            search,
        }, {
            preserveState: true,
        });
    };

    const clearFilters = () => {
        setFightNumber('');
        setSide('');
        setStatus('');
        setStartDate('');
        setEndDate('');
        setSearch('');
        router.get('/teller/bets');
    };

    const getSideColor = (betSide: string) => {
        switch (betSide) {
            case 'meron': return 'bg-red-600';
            case 'wala': return 'bg-blue-600';
            case 'draw': return 'bg-green-600';
            default: return 'bg-gray-600';
        }
    };

    const getStatusColor = (betStatus: string) => {
        switch (betStatus) {
            case 'won': return 'bg-green-600';
            case 'lost': return 'bg-red-600';
            case 'refunded': return 'bg-yellow-600';
            case 'active': return 'bg-blue-600';
            default: return 'bg-gray-600';
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <Head title="Bet History" />

            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={() => router.visit('/teller/dashboard')}
                    className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                >
                    ← Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold">Bet History</h1>
                <p className="text-gray-400 mt-2">View and search your betting history</p>
            </div>

            {/* Filters */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                            Search Ticket ID
                        </label>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Enter ticket ID..."
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                            Fight Number
                        </label>
                        <select
                            value={fightNumber}
                            onChange={(e) => setFightNumber(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        >
                            <option value="">All Fights</option>
                            {fightNumbers.map((num) => (
                                <option key={num} value={num}>Fight #{num}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                            Side
                        </label>
                        <select
                            value={side}
                            onChange={(e) => setSide(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        >
                            <option value="">All Sides</option>
                            <option value="meron">Meron</option>
                            <option value="wala">Wala</option>
                            <option value="draw">Draw</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                            Status
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        >
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="won">Won</option>
                            <option value="lost">Lost</option>
                            <option value="refunded">Refunded</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                            Start Date
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                            End Date
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        />
                    </div>
                </div>
                <div className="flex gap-3 mt-4">
                    <button
                        onClick={applyFilters}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
                    >
                        Apply Filters
                    </button>
                    <button
                        onClick={clearFilters}
                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Bets Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-700 border-b border-gray-600 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Your Bets</h2>
                    <div className="text-sm text-gray-400">
                        Showing {bets.data.length} of {bets.total} bets
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">
                                    Ticket ID
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">
                                    Fight
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">
                                    Side
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase">
                                    Amount
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase">
                                    Odds
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase">
                                    Potential
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase">
                                    Payout
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {bets.data.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-6 py-12 text-center text-gray-400">
                                        No bets found
                                    </td>
                                </tr>
                            ) : (
                                bets.data.map((bet) => (
                                    <tr key={bet.id} className="hover:bg-gray-700/50">
                                        <td className="px-6 py-4 text-sm font-mono text-gray-300">
                                            #{bet.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-white">Fight #{bet.fight.fight_number}</div>
                                            <div className="text-xs text-gray-400">
                                                {bet.fight.meron_fighter} vs {bet.fight.wala_fighter}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getSideColor(bet.side)}`}>
                                                {bet.side.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="font-semibold text-white">
                                                ₱{bet.amount.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-gray-300">
                                            {bet.odds}x
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="font-semibold text-blue-400">
                                                ₱{bet.potential_payout.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(bet.status)}`}>
                                                {bet.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {bet.actual_payout ? (
                                                <span className="font-bold text-green-400">
                                                    ₱{bet.actual_payout.toLocaleString()}
                                                </span>
                                            ) : (
                                                <span className="text-gray-500">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-300">
                                            {new Date(bet.created_at).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {bets.last_page > 1 && (
                    <div className="p-4 bg-gray-700 border-t border-gray-600 flex justify-between items-center">
                        <div className="text-sm text-gray-400">
                            Page {bets.current_page} of {bets.last_page}
                        </div>
                        <div className="flex gap-2">
                            {bets.current_page > 1 && (
                                <button
                                    onClick={() => router.get(`/teller/bets?page=${bets.current_page - 1}`, filters)}
                                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg"
                                >
                                    Previous
                                </button>
                            )}
                            {bets.current_page < bets.last_page && (
                                <button
                                    onClick={() => router.get(`/teller/bets?page=${bets.current_page + 1}`, filters)}
                                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
