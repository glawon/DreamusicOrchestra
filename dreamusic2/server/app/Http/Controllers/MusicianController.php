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
            'strumento'=>'required|string',
            'immagine'=>'required|file'
        ]);

        //devo fare il path di file prima di salvare il record
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
        // try{
            // Caricamento e salvataggio di un'immagine
            $uploaded = $request->file('immagine');
            $imageName = $request->nome . ".jpg";
            $pathToStorage = 'public/musicisti/' . $imageName;
            $uploaded->storeAs($pathToStorage);
            
            //creo il path da mettere nell'attributo 'immagine'
            $imagePath = 'http://localhost:8000/storage/musicisti/' . $imageName;

            $musician = Musician::find($id);
            $musician->nome = $request->input('nome');
            $musician->cognome = $request->input('cognome');
            $musician->strumento = $request->input('strumento');
            $musician->immagine = $imagePath;
            $musician->save();

            return response()->json([
                'message' => 'Musicista aggiornato con successo',
                'musician' => $musician
            ]);
        // }
        // catch(\Exception $e){
        //     return response()->json([
        //         'message' => 'Errore durante il salvataggio del file',
        //     ], 500);
        // }
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
