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
        Schema::table('fights', function (Blueprint $table) {
            $table->text('notes')->nullable()->after('remarks');
            $table->string('venue')->nullable()->after('notes');
            $table->string('event_name')->nullable()->after('venue');
            $table->integer('round_number')->nullable()->after('event_name');
            $table->string('match_type')->default('regular')->after('round_number'); // regular, derby, tournament
            $table->text('special_conditions')->nullable()->after('match_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('fights', function (Blueprint $table) {
            $table->dropColumn([
                'notes',
                'venue',
                'event_name',
                'round_number',
                'match_type',
                'special_conditions'
            ]);
        });
    }
};
