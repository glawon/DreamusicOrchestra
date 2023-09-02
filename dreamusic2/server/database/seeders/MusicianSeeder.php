<?php

namespace Database\Seeders;

use App\Models\Musician;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MusicianSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Musician::insert([
            [
                'nome'=>'Cristiana',
                'cognome'=>'Cunsolo',
                'strumento'=>'flauto'
            ],
            [
                'nome'=>'Carlotta',
                'cognome'=>'Cosentino',
                'strumento'=>'violino'
            ],
            [
                'nome'=>'Chiara',
                'cognome'=>'Impellizzeri',
                'strumento'=>'violino'
            ],
            [
                'nome'=>'Adriana',
                'cognome'=>'Cannata',
                'strumento'=>'viola'
            ],
            [
                'nome'=>'Laura',
                'cognome'=>'Cantone',
                'strumento'=>'violoncello'
            ],
            [
                'nome'=>'Emanuele',
                'cognome'=>'Schinocca',
                'strumento'=>'tastiera'
            ],
            [
                'nome'=>'Davide',
                'cognome'=>'Di Maria',
                'strumento'=>'piano'
            ],
            [
                'nome'=>'Antonio',
                'cognome'=>'Fiorenza',
                'strumento'=>'tromba'
            ],
            [
                'nome'=>'Flavio',
                'cognome'=>'Pennisi',
                'strumento'=>'trombone'
            ],
            [
                'nome'=>'Antonio',
                'cognome'=>'Vassallo',
                'strumento'=>'percussioni'
            ],
            [
                'nome'=>'Giulio',
                'cognome'=>'Di Prima',
                'strumento'=>'percussioni'
            ],
            [
                'nome'=>'Gabriele',
                'cognome'=>'Vasta',
                'strumento'=>'percussioni'
            ]
        ]);
    }
}

