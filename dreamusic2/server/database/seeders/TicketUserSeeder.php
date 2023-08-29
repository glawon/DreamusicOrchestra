<?php

namespace Database\Seeders;

use App\Models\TicketUser;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TicketUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TicketUser::insert([
            [ 
                'idTicket'=>'1',
                'idUser'=>'1',
                'posto'=>'A1'
            ],
            [
                'idTicket'=>'1',
                'idUser'=>'2',
                'posto'=>'A2'
            ],
            [
                'idTicket'=>'2',
                'idUser'=>'3',
                'posto'=>'F1'
            ],
            [ 
                'idTicket'=>'3',
                'idUser'=>'1',
                'posto'=>'F4'
            ]
        ]);
    }
}