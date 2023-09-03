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
                'immagine'=>'http://localhost:8000/storage/musicisti/Cristiana.jpg'
            ],
            [
                'nome'=>'Carlotta',
                'cognome'=>'Cosentino',
                'strumento'=>'violino',
                'immagine'=>'http://localhost:8000/storage/musicisti/Carlotta.jpg'
            ],
            [
                'nome'=>'Chiara',
                'cognome'=>'Impellizzeri',
                'strumento'=>'violino',
                'immagine'=>'http://localhost:8000/storage/musicisti/Chiara.jpg'
            ],
            [
                'nome'=>'Adriana',
                'cognome'=>'Cannata',
                'strumento'=>'viola',
                'immagine'=>'http://localhost:8000/storage/musicisti/Adriana.jpg'
            ],
            [
                'nome'=>'Laura',
                'cognome'=>'Cantone',
                'strumento'=>'violoncello',
                'immagine'=>'http://localhost:8000/storage/musicisti/Laura.jpg'
            ],
            [
                'nome'=>'Emanuele',
                'cognome'=>'Schinocca',
                'strumento'=>'tastiera',
                'immagine'=>'http://localhost:8000/storage/musicisti/Emanuele.jpg'
            ],
            [
                'nome'=>'Davide',
                'cognome'=>'Di Maria',
                'strumento'=>'piano',
                'immagine'=>'http://localhost:8000/storage/musicisti/Davide.jpg'
            ],
            [
                'nome'=>'Antonio',
                'cognome'=>'Fiorenza',
                'strumento'=>'tromba',
                'immagine'=>'http://localhost:8000/storage/musicisti/Antonio F.jpg'
            ],
            [
                'nome'=>'Flavio',
                'cognome'=>'Pennisi',
                'strumento'=>'trombone',
                'immagine'=>'http://localhost:8000/storage/musicisti/Flavio.jpg'
            ],
            [
                'nome'=>'Antonio',
                'cognome'=>'Vassallo',
                'strumento'=>'percussioni',
                'immagine'=>'http://localhost:8000/storage/musicisti/Antonio V.jpg'
            ],
            [
                'nome'=>'Giulio',
                'cognome'=>'Di Prima',
                'strumento'=>'percussioni',
                'immagine'=>'http://localhost:8000/storage/musicisti/Giulio.jpg'
            ],
            [
                'nome'=>'Gabriele',
                'cognome'=>'Vasta',
                'strumento'=>'percussioni',
                'immagine'=>'http://localhost:8000/storage/musicisti/Gabriele.jpg'
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

