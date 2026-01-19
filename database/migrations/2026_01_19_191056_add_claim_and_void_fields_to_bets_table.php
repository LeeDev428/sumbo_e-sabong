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
        Schema::table('bets', function (Blueprint $table) {
            $table->timestamp('claimed_at')->nullable()->after('updated_at');
            $table->foreignId('claimed_by')->nullable()->constrained('users')->after('claimed_at');
            $table->timestamp('voided_at')->nullable()->after('claimed_by');
            $table->foreignId('voided_by')->nullable()->constrained('users')->after('voided_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bets', function (Blueprint $table) {
            $table->dropForeign(['claimed_by']);
            $table->dropForeign(['voided_by']);
            $table->dropColumn(['claimed_at', 'claimed_by', 'voided_at', 'voided_by']);
        });
    }
};
