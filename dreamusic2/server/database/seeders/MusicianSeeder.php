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
                'immagine'=>'public/musicisti/Cristiana.jpg'
            ],
            [
                'nome'=>'Carlotta',
                'cognome'=>'Cosentino',
                'strumento'=>'violino',
                'immagine'=>'public/musicisti/Carlotta.jpg'
            ],
            [
                'nome'=>'Chiara',
                'cognome'=>'Impellizzeri',
                'strumento'=>'violino',
                'immagine'=>'public/musicisti/Chiara.jpg'
            ],
            [
                'nome'=>'Adriana',
                'cognome'=>'Cannata',
                'strumento'=>'viola',
                'immagine'=>'public/musicisti/Adriana.jpg'
            ],
            [
                'nome'=>'Laura',
                'cognome'=>'Cantone',
                'strumento'=>'violoncello',
                'immagine'=>'public/musicisti/Laura.jpg'
            ],
            [
                'nome'=>'Emanuele',
                'cognome'=>'Schinocca',
                'strumento'=>'tastiera',
                'immagine'=>'public/musicisti/Emanuele.jpg'
            ],
            [
                'nome'=>'Davide',
                'cognome'=>'Di Maria',
                'strumento'=>'piano',
                'immagine'=>'public/musicisti/Davide.jpg'
            ],
            [
                'nome'=>'Antonio',
                'cognome'=>'Fiorenza',
                'strumento'=>'tromba',
                'immagine'=>'public/musicisti/Antonio F.jpg'
            ],
            [
                'nome'=>'Flavio',
                'cognome'=>'Pennisi',
                'strumento'=>'trombone',
                'immagine'=>'public/musicisti/Flavio.jpg'
            ],
            [
                'nome'=>'Antonio',
                'cognome'=>'Vassallo',
                'strumento'=>'percussioni',
                'immagine'=>'public/musicisti/Antonio V.jpg'
            ],
            [
                'nome'=>'Giulio',
                'cognome'=>'Di Prima',
                'strumento'=>'percussioni',
                'immagine'=>'public/musicisti/Giulio.jpg'
            ],
            [
                'nome'=>'Gabriele',
                'cognome'=>'Vasta',
                'strumento'=>'percussioni',
                'immagine'=>'public/musicisti/Gabriele.jpg'
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

