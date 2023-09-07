<?php

namespace App\Http\Controllers;

use App\Models\Musician;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

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
            'immagine'=>'file'
        ]);

        $uploaded = $request->file('immagine');
        
        if ($uploaded !== null) {
            $imageName = $request->nome.Carbon::now()->format('Y-m-d_H-i-s') . ".jpg";
            $pathToStorage = 'public/musicisti/' . $imageName;
            $uploaded->storeAs($pathToStorage);
        } else {
            return response()->json([
                'message' => 'Nessun file caricato.',
            ], 400);
        }

        //creo il path da mettere nell'attributo 'immagine'
        $imagePath = 'http://localhost:8000/storage/musicisti/' . $imageName;

        $musician = Musician::create([
            'nome' => $request->input('nome'),
            'cognome' => $request->input('cognome'),
            'strumento' => $request->input('strumento'),
            'immagine' => $imagePath
        ]);
        return response()->json([
            'musician creato'=>$musician
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
        // Caricamento e salvataggio di un'immagine
        // return $request;
        if(is_string($request->input('immagine'))) {
            // Si tratta di una stringa, assumi che sia già un percorso di immagine
            $imagePath = $request->input('immagine');
        }
        else{
            $uploaded = $request->file('immagine');
            
            if ($uploaded !== null) {
                // $uploadedFile->getClientOriginalName();
                $imageName = $request->nome.Carbon::now()->format('Y-m-d_H-i-s') . ".jpg";
                $pathToStorage = 'public/musicisti/' . $imageName;
                $uploaded->storeAs($pathToStorage);
                $imagePath = 'http://localhost:8000/storage/musicisti/' . $imageName;
            } else {
                return response()->json([
                    'message' => 'Nessun file caricato.',
                ], 400);
            }
        }

        //creo il path da mettere nell'attributo 'immagine'
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
