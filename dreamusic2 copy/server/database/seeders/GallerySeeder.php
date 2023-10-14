<?php

namespace Database\Seeders;

use App\Models\GalleryImages;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // elenco dei path dei file in public/gallery
        $paths = Storage::files('public/gallery');

        foreach ($paths as $imagePath) {
            // estrazione del nome del file senza estensione
            $imageName = pathinfo($imagePath, PATHINFO_FILENAME);
            $imagePath = "http://localhost:8000/storage/gallery/" . $imageName . ".jpg";

            GalleryImages::insert([
                'nome' => $imageName,
                'percorso' => $imagePath,
            ]);
        }
    }
}