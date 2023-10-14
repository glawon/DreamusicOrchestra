<?php

namespace Database\Seeders;

use App\Models\MusicianImages;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class MusicianImagesSeeder extends Seeder
{
    public function run()
    {
        // elenco dei path dei file in public/gallery
        $paths = Storage::files('public/musicisti');

        foreach ($paths as $imagePath) {
            // estrazione del nome del file senza estensione
            $imageName = pathinfo($imagePath, PATHINFO_FILENAME);

            MusicianImages::insert([
                'nome' => $imageName,
                'percorso' => $imagePath,
            ]);
        }
    }
}
