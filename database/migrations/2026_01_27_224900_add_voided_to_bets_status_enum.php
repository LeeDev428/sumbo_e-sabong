<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Alter the ENUM column to add 'voided' and 'claimed' values
        DB::statement("ALTER TABLE bets MODIFY COLUMN status ENUM('active', 'won', 'lost', 'cancelled', 'refunded', 'voided', 'claimed') NOT NULL DEFAULT 'active'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove 'voided' and 'claimed' from ENUM
        DB::statement("ALTER TABLE bets MODIFY COLUMN status ENUM('active', 'won', 'lost', 'cancelled', 'refunded') NOT NULL DEFAULT 'active'");
    }
};
