<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Item::insert([
            [
                'oggettificabile_type'=>'App\Models\Track',
                'oggettificabile_id'=>'1',
                'prezzo'=>'2'
            ],
            [
                'oggettificabile_type'=>'App\Models\Track',
                'oggettificabile_id'=>'2',
                'prezzo'=>'2'
            ],
            [
                'oggettificabile_type'=>'App\Models\Score',
                'oggettificabile_id'=>'1',
                'prezzo'=>'5'
            ]
        ]);
    }
}
