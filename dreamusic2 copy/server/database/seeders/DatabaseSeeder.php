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
            TicketSeeder::class,
            TicketUserSeeder::class,
            MusicianSeeder::class,
            GallerySeeder::class
            // ItemSeeder::class,
            // ScoreSeeder::class,
            // TrackSeeder::class,
            // MusicianImagesSeeder::class
        ]);
    }
}
