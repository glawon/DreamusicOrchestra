<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert([
            [
                'nome'=>'Diletta',
                'cognome'=>'M',
                'email'=>'1@email.com',
                'password'=> Hash::make('ciao'),
                'ruolo'=>'admin'
            ],
            [
                'nome'=>'Adriana',
                'cognome'=>'C',
                'email'=>'2@email.com',
                'password'=>Hash::make('ciao1'),
                'ruolo'=>'admin'
            ],
            [
                'nome'=>'Rory',
                'cognome'=>'C',
                'email'=>'3@email.com',
                'password'=>Hash::make('ciao2'),
                'ruolo'=>'user'
            ]
        ]);
    }
}
