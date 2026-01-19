<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('teller_cash_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fight_id')->constrained()->onDelete('cascade');
            $table->foreignId('teller_id')->constrained('users')->onDelete('cascade');
            $table->decimal('assigned_amount', 15, 2)->default(0);
            $table->decimal('current_balance', 15, 2)->default(0); // Tracks remaining balance
            $table->timestamps();
            
            // Ensure one assignment per teller per fight
            $table->unique(['fight_id', 'teller_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teller_cash_assignments');
    }
};
