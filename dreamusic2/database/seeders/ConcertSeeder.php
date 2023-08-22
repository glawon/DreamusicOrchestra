<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Concert;

class ConcertSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Concert::insert([
            [
                'data'=>'2023-08-20',
                'citta'=>'Catania',
                'teatro'=>'A',
                'nome'=>'concerto1',
                'programma'=>'boh',
                'totPosti'=>'100'
            ],
            [
                'data'=>'2023-10-17',
                'citta'=>'Bronte',
                'teatro'=>'B',
                'nome'=>'concerto2',
                'programma'=>'boh',
                'totPosti'=>'120'
            ],
            [
                'data'=>'2023-12-21',
                'citta'=>'Enna',
                'teatro'=>'C',
                'nome'=>'Natale',
                'programma'=>'boh',
                'totPosti'=>'150'
            ]
        ]);
    }
}
