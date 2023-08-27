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
                'ora'=>'20:15:00',
                'locandina'=>'https://cdn.pixabay.com/photo/2012/04/12/19/59/sicily-30414_1280.png',
                'citta'=>'Catania',
                'teatro'=>'Teatro Ambasciatori',
                'nome'=>'Lello Analfino e Tinturia',
                'programma'=>'boh',
                'totPosti'=>'100'
            ],
            [
                'data'=>'2023-10-17',
                'ora'=>'21:30:00',
                'locandina'=>'https://cdn.pixabay.com/photo/2019/09/19/18/05/clapboard-4489924_1280.png',
                'citta'=>'Bronte',
                'teatro'=>'Parco Urbano',
                'nome'=>'Tributo ad Hans Zimmer',
                'programma'=>'boh',
                'totPosti'=>'120'
            ],
            [
                'data'=>'2023-12-21',
                'citta'=>'Palermo',
                'ora'=>'19:30:00',
                'locandina'=>'https://cdn.pixabay.com/photo/2014/12/21/07/50/christmas-tree-574742_1280.jpg',
                'teatro'=>'Teatro Politeama Garibaldi',
                'nome'=>'Concerto di Natale',
                'programma'=>'boh',
                'totPosti'=>'150'
            ]
        ]);
    }
}
