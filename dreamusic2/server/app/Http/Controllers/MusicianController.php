<?php

namespace App\Http\Controllers;

use App\Models\Musician;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MusicianController extends Controller
{
    public function index(){
        $musicisti = Musician::all();
        return response()->json([
            "status" => "musicisti presi con successo",
            "musicisti" => $musicisti
        ]);
    }

    public function store(Request $request)
    {
        // $user = Auth::user(); //controllo se vale il token
        $request->validate([
            'nome'=>'required|string',
            'cognome'=>'required|string',
            'strumento'=>'required|string'
        ]);

        $musician = Musician::create($request->all());
        return response()->json([
            'musician'=>$musician
        ]);
    }

    public function edit($id)
    {
        $musician = Musician::find($id);
        return response()->json([
            'musicista selezionato per la modifica'=>$musician
        ]);
    }

    public function update(Request $request, $id)
    {
        $musician = Musician::find($id);
        $musician->nome = $request->input('nome');
        $musician->cognome = $request->input('cognome');
        $musician->strumento = $request->input('strumento');
        $musician->save();

        return response()->json([
            'message' => 'Musicista aggiornato con successo',
            'musician' => $musician
        ]);
    }

    public function destroy(string $id)
    {
        $musician = Musician::find($id);
        $nome_cognome = "$musician->nome " . "$musician->cognome";
        $musician->delete();
        return response()->json([
            'message'=>"musicista $nome_cognome eliminato"
        ]);
    }
}
