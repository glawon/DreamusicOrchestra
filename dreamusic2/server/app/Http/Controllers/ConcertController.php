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

    public function edit(string $id){
        $concert = Concert::find($id);
        return response()->json([
            'concert selezionato per la modifica'=>$concert
        ]);
    }

    public function update(Request $request, $id)
    {
        // locandina
        $uploaded = $request->file('locandina');
        if ($uploaded !== null) {

            // $uploadedFile->getClientOriginalName();
            $imageName = $request->nome.Carbon::now()->format('Y-m-d_H-i-s') . ".jpg";
            $pathToStorage = 'public/eventi/' . $imageName;
            $uploaded->storeAs($pathToStorage);
        } else {
            return response()->json([
                'message' => 'Nessun file caricato.',
            ], 400);
        }
        //creo il path da mettere nell'attributo 'immagine'
        $imagePath = 'http://localhost:8000/storage/eventi/' . $imageName;

        $concerto = Concert::find($id);
        // $concerto->data = $request->input('data');
        // $concerto->ora = $request->input('ora');
        // $concerto->citta = $request->input('citta');
        // $concerto->teatro = $request->input('teatro');
        // $concerto->nome = $request->input('nome');
        // $concerto->programma = $request->input('programma');
        // $concerto->totPosti = $request->input('totPosti');
        // $concerto->bigliettiVenduti = $request->input('bigliettiVenduti');
        $data = $request->only([
            'data', 'ora', 'citta', 'teatro', 'nome', 
            'programma', 'totPosti', 'bigliettiVenduti'
        ]);
        $concerto->update($data);
        $concerto->locandina = $imagePath;
        return $concerto;
        $concerto->save();

        return response()->json([
            'message' => 'Evento aggiornato con successo',
            'concerto' => $concerto
        ]);
    }
}