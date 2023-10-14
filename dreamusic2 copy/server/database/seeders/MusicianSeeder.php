<?php

namespace Database\Seeders;

use App\Models\Musician;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class MusicianSeeder extends Seeder
{
    
    public function run(): void
    {
        Musician::insert([
            [
                'nome'=>'Cristiana',
                'cognome'=>'Cunsolo',
                'strumento'=>'flauto',
                'immagine'=>'http://localhost:8000/storage/musicisti/flauto.png'
            ],
            [
                'nome'=>'Carlotta',
                'cognome'=>'Cosentino',
                'strumento'=>'violino',
                'immagine'=>'http://localhost:8000/storage/musicisti/violin.png'
            ],
            [
                'nome'=>'Chiara',
                'cognome'=>'Impellizzeri',
                'strumento'=>'violin',
                'immagine'=>'http://localhost:8000/storage/musicisti/violin.png'
            ],
            [
                'nome'=>'Adriana',
                'cognome'=>'Cannata',
                'strumento'=>'viola',
                'immagine'=>'http://localhost:8000/storage/musicisti/violin.png'
            ],
            [
                'nome'=>'Laura',
                'cognome'=>'Cantone',
                'strumento'=>'violoncello',
                'immagine'=>'http://localhost:8000/storage/musicisti/cello.png'
            ],
            [
                'nome'=>'Emanuele',
                'cognome'=>'Schinocca',
                'strumento'=>'contrabbasso',
                'immagine'=>'http://localhost:8000/storage/musicisti/double-bass.png'
            ],
            [
                'nome'=>'Davide',
                'cognome'=>'Di Maria',
                'strumento'=>'piano',
                'immagine'=>'http://localhost:8000/storage/musicisti/piano.png'
            ],
            [
                'nome'=>'Antonio',
                'cognome'=>'Fiorenza',
                'strumento'=>'tromba',
                'immagine'=>'http://localhost:8000/storage/musicisti/trumpet.png'
            ],
            [
                'nome'=>'Flavio',
                'cognome'=>'Pennisi',
                'strumento'=>'trombone',
                'immagine'=>'http://localhost:8000/storage/musicisti/trombone.png'
            ],
            [
                'nome'=>'Antonio',
                'cognome'=>'Vassallo',
                'strumento'=>'percussioni',
                'immagine'=>'http://localhost:8000/storage/musicisti/tamburello.png'
            ],
            [
                'nome'=>'Giulio',
                'cognome'=>'Di Prima',
                'strumento'=>'percussioni',
                'immagine'=>'http://localhost:8000/storage/musicisti/xilofono.png'
            ],
            [
                'nome'=>'Gabriele',
                'cognome'=>'Vasta',
                'strumento'=>'percussioni',
                'immagine'=>'http://localhost:8000/storage/musicisti/drums.png'
            ]
        ]);

        // $paths = Storage::files('public/musicisti');

        // foreach ($paths as $imagePath) {
        //     Musician::insert([
        //         'immagine' => $imagePath
        //     ]);
        // }
    }
}

