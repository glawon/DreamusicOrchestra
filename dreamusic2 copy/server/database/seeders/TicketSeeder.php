<?php

namespace Database\Seeders;

use App\Models\Ticket;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Ticket::insert([
            [
                'idConcerto'=>'1',
                'prezzo'=>'5.00'
            ],
            [
                'idConcerto'=>'2',
                'prezzo'=>'5.00'
            ],
            [
                'idConcerto'=>'3',
                'prezzo'=>'5.00'
            ]
        ]);
    }
}
