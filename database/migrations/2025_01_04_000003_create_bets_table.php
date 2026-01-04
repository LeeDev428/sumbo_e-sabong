<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bets', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_id')->unique();
            $table->foreignId('fight_id')->constrained('fights');
            $table->foreignId('teller_id')->constrained('users');
            $table->enum('side', ['meron', 'wala']);
            $table->decimal('amount', 10, 2);
            $table->decimal('odds', 8, 2);
            $table->decimal('potential_payout', 10, 2);
            $table->enum('status', ['active', 'won', 'lost', 'cancelled', 'refunded'])->default('active');
            $table->decimal('actual_payout', 10, 2)->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['fight_id', 'side']);
            $table->index(['teller_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bets');
    }
};
