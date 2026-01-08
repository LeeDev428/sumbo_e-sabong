<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Fight;
use App\Models\Bet;
use Illuminate\Http\Request;
use Inertia\Inertia;
use DB;

class CommissionController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->input('start_date', now()->startOfMonth()->toDateString());
        $endDate = $request->input('end_date', now()->toDateString());

        // Get fights with commission data
        $fights = Fight::where('status', 'result_declared')
            ->whereBetween('result_declared_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59'])
            ->with(['declarator'])
            ->latest('result_declared_at')
            ->get()
            ->map(function ($fight) {
                $totalPot = (float) Bet::where('fight_id', $fight->id)
                    ->whereIn('status', ['won', 'lost', 'refunded'])
                    ->sum('amount');
                
                $commission = $totalPot * ($fight->commission_percentage / 100);

                return [
                    'id' => $fight->id,
                    'fight_number' => $fight->fight_number,
                    'meron_fighter' => $fight->meron_fighter,
                    'wala_fighter' => $fight->wala_fighter,
                    'result' => $fight->result,
                    'result_declared_at' => $fight->result_declared_at,
                    'total_pot' => $totalPot,
                    'commission_percentage' => $fight->commission_percentage,
                    'commission_amount' => $commission,
                    'net_pot' => $totalPot - $commission,
                    'declarator' => $fight->declarator ? $fight->declarator->name : 'N/A',
                ];
            });

        // Summary stats
        $stats = [
            'total_commission' => $fights->sum('commission_amount'),
            'total_pot' => $fights->sum('total_pot'),
            'total_fights' => $fights->count(),
            'average_commission' => $fights->count() > 0 ? $fights->avg('commission_amount') : 0,
        ];

        return Inertia::render('admin/commissions/index', [
            'fights' => $fights,
            'stats' => $stats,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
        ]);
    }
}
