<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Concert;

class ConcertController extends Controller
{
    public function show($id){
        $concerto = Concert::find($id); //where('id', "<", $id)
        return response()->json([
            "status" => "concerto preso con successo",
            "concerto" => $concerto
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