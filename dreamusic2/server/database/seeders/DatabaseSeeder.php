<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ConcertSeeder::class, 
            UserSeeder::class,
            TrackSeeder::class,
            ScoreSeeder::class,
            TicketSeeder::class,
            TicketUserSeeder::class,
            ItemSeeder::class,
            MusicianSeeder::class,
            GallerySeeder::class
            // MusicianImagesSeeder::class
        ]);
    }
}
