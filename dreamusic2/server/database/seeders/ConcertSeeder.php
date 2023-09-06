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
                'programma'=>'Un\'indimenticabile serata di omaggio alla musica ti attende all\'evento "Tributo a Lello Analfino e Tinturia". Questa straordinaria performance celebra due talenti unici della scena musicale italiana. Sarai trasportato dalle canzoni e dalle melodie che hanno reso famosi Lello Analfino e i Tinturia, interpretate con passione e rispetto da artisti eccezionali. Un\'esperienza da non perdere per tutti gli appassionati della musica italiana. Un omaggio alla musica e all\'arte che lascerà il pubblico incantato.',
                'tot_posti'=>'100'
            ],
            [
                'data'=>'2023-10-17',
                'ora'=>'21:30:00',
                'locandina'=>'https://cdn.pixabay.com/photo/2015/01/11/09/19/film-596009_1280.jpg',
                'citta'=>'Bronte',
                'teatro'=>'Parco Urbano',
                'nome'=>'Tributo ad Hans Zimmer',
                'programma'=>'Un\'emozionante serata di musica epica e colonna sonora cinematografica ti aspetta al concerto "Tributo ad Hans Zimmer". Un viaggio attraverso le straordinarie composizioni di Hans Zimmer, che hanno dato vita alle colonne sonore dei film più iconici. Un\'esperienza da non perdere per gli amanti della musica e del cinema.',
                'tot_posti'=>'120'
            ],
            [
                'data'=>'2023-12-21',
                'citta'=>'Palermo',
                'ora'=>'19:30:00',
                'locandina'=>'https://cdn.pixabay.com/photo/2014/12/21/07/50/christmas-tree-574742_1280.jpg',
                'teatro'=>'Teatro Politeama Garibaldi',
                'nome'=>'Concerto di Natale',
                'programma'=>'Un incantevole Concerto di Natale con la Dreamusic Orchestra, dedicato alle melodie natalizie dei classici Disney. La magia delle festività incontra la magia Disney in un\'esperienza musicale unica. Unisciti a noi per un Natale pieno di gioia e incanto con le canzoni indimenticabili dei tuoi film Disney preferiti.',
                'tot_posti'=>'150'
            ]
        ]);
    }
}
