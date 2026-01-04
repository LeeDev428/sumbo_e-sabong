import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Fight } from '@/types';
import { Ticket, DollarSign } from 'lucide-react';
import { useState } from 'react';

interface TellerDashboardProps {
    fights?: Fight[];
}

export default function TellerDashboard({ fights = [] }: TellerDashboardProps) {
    const [selectedFight, setSelectedFight] = useState<Fight | null>(null);
    const [betSide, setBetSide] = useState<'meron' | 'wala' | null>(null);
    const [betAmount, setBetAmount] = useState('');

    const openFights = fights.filter(f => f.status === 'betting_open');

    const handlePlaceBet = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFight || !betSide || !betAmount) return;

        router.post(route('teller.bets.store'), {
            fight_id: selectedFight.id,
            side: betSide,
            amount: parseFloat(betAmount),
        }, {
            onSuccess: () => {
                setSelectedFight(null);
                setBetSide(null);
                setBetAmount('');
            },
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Teller Dashboard" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Teller Dashboard</h1>
                    <p className="text-muted-foreground">
                        Accept bets and manage transactions
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Open Fights</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{openFights.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Accepting bets now
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Today's Bets</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground">
                                Tickets issued today
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Cash Balance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₱0.00</div>
                            <p className="text-xs text-muted-foreground">
                                Current cash on hand
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {selectedFight ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Place Bet - Fight #{selectedFight.fight_number}</CardTitle>
                            <CardDescription>
                                <span className="text-red-600 font-medium">MERON: {selectedFight.meron_fighter}</span>
                                {' vs '}
                                <span className="text-blue-600 font-medium">WALA: {selectedFight.wala_fighter}</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handlePlaceBet} className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <button
                                        type="button"
                                        onClick={() => setBetSide('meron')}
                                        className={`p-6 border-2 rounded-lg transition-all ${
                                            betSide === 'meron'
                                                ? 'border-red-600 bg-red-50'
                                                : 'border-gray-200 hover:border-red-300'
                                        }`}
                                    >
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-red-600 mb-2">MERON</div>
                                            <div className="text-sm text-muted-foreground">
                                                Odds: {selectedFight.meron_odds || 'N/A'}
                                            </div>
                                        </div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setBetSide('wala')}
                                        className={`p-6 border-2 rounded-lg transition-all ${
                                            betSide === 'wala'
                                                ? 'border-blue-600 bg-blue-50'
                                                : 'border-gray-200 hover:border-blue-300'
                                        }`}
                                    >
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600 mb-2">WALA</div>
                                            <div className="text-sm text-muted-foreground">
                                                Odds: {selectedFight.wala_odds || 'N/A'}
                                            </div>
                                        </div>
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Bet Amount</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="1"
                                        value={betAmount}
                                        onChange={(e) => setBetAmount(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md"
                                        placeholder="Enter amount"
                                        required
                                    />
                                </div>

                                {betSide && betAmount && (
                                    <div className="p-4 bg-muted rounded-lg">
                                        <div className="text-sm text-muted-foreground mb-1">Potential Payout</div>
                                        <div className="text-2xl font-bold">
                                            ₱{(parseFloat(betAmount) * (betSide === 'meron' ? (selectedFight.meron_odds || 0) : (selectedFight.wala_odds || 0))).toFixed(2)}
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-2">
                                    <Button type="submit" disabled={!betSide || !betAmount} className="flex-1">
                                        <Ticket className="mr-2 h-4 w-4" />
                                        Issue Ticket
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => {
                                        setSelectedFight(null);
                                        setBetSide(null);
                                        setBetAmount('');
                                    }}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Open Fights - Select to Place Bet</CardTitle>
                            <CardDescription>
                                Choose a fight to start accepting bets
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {openFights.length > 0 ? (
                                <div className="space-y-4">
                                    {openFights.map((fight) => (
                                        <div
                                            key={fight.id}
                                            className="flex items-center justify-between border-b pb-4 last:border-0"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold">Fight #{fight.fight_number}</span>
                                                    <Badge variant="default">BETTING OPEN</Badge>
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    <span className="text-red-600 font-medium">MERON: {fight.meron_fighter}</span>
                                                    {' vs '}
                                                    <span className="text-blue-600 font-medium">WALA: {fight.wala_fighter}</span>
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Odds: {fight.meron_odds || 'N/A'} / {fight.wala_odds || 'N/A'}
                                                </div>
                                            </div>
                                            <Button onClick={() => setSelectedFight(fight)}>
                                                Place Bet
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    No open fights. Waiting for admin to open betting.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Link href={route('teller.bets.history')}>
                                <Button className="w-full" variant="outline">
                                    <Ticket className="mr-2 h-4 w-4" />
                                    View Bet History
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
