<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin user
        User::firstOrCreate(
            ['email' => 'admin@esabong.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'),
                'role' => 'admin',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // Create Declarator user
        User::firstOrCreate(
            ['email' => 'declarator@esabong.com'],
            [
                'name' => 'Declarator User',
                'password' => bcrypt('password'),
                'role' => 'declarator',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // Create Teller user
        User::firstOrCreate(
            ['email' => 'teller@esabong.com'],
            [
                'name' => 'Teller User',
                'password' => bcrypt('password'),
                'role' => 'teller',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );
    }
}
