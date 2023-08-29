<?php

namespace Database\Seeders;

use App\Models\Track;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TrackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Track::insert([
            [
                'nome'=>'Brano 1',
                'organico'=>'organico 1',
                'film'=>'film 1',
                'durata'=>'3.55'
            ],
            [
                'nome'=>'Brano 2',
                'organico'=>'organico 2',
                'film'=>'film 2',
                'durata'=>'4.32'
            ],
            [
                'nome'=>'Brano 3',
                'organico'=>'organico 3',
                'film'=>'film 3',
                'durata'=>'5.20'
            ]
        ]);
    }
}
// non so perché non funziona l'inserimento degli altri due record
//insert into 'tracks' ('nome', 'organico', 'film', 'durata') values ('Brano 2', 'organico 2', 'film 2', '3.55'), ('Brano 3', 'organico 3', 'film 3', '5.55');