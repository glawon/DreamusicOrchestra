<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use App\Models\Concert;

class ConcertController extends Controller
{
    public function show($id){
        $concerto = Concert::find($id); //where('id', "<", $id)
        $biglietto = Ticket::where('idConcerto', $id)->first();
        return response()->json([
            "status" => "concerto preso con successo",
            "concerto" => $concerto,
            "prezzo" => $biglietto->prezzo
        ]);
    }

    public function index(){
        $concerti = Concert::all();
        return response()->json([
            "status" => "concerti presi con successo",
            "concerto" => $concerti
        ]);
    }
}