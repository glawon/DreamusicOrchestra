<?php

namespace Database\Seeders;

use App\Models\Score;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ScoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Score::insert([
            [
                'nome'=>'Partitura 1'
            ],
            [
                'nome'=>'Partitura 2'
            ],
            [
                'nome'=>'Partitura 3'
            ]
        ]);
    }
}
