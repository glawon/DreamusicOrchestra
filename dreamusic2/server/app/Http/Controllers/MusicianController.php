<?php

namespace App\Http\Controllers;

use App\Models\Musician;
use Illuminate\Http\Request;

class MusicianController extends Controller
{
    public function index(){
        $musicisti = Musician::all();
        return response()->json([
            "status" => "musicisti presi con successo",
            "musicisti" => $musicisti
        ]);
    }
}
