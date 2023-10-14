<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use App\Models\Concert;
use Illuminate\Support\Carbon;

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

    public function store(Request $request)
    {
        // return $request;
        $uploaded = $request->file('locandina');
        // return $uploaded;
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

        $concerto = Concert::create([
            'data' => $request->input('data'),
            'ora' => $request->input('ora'),
            'citta' => $request->input('citta'),
            'teatro' => $request->input('teatro'),
            'nome' => $request->input('nome'),
            'programma' => $request->input('programma'),
            'tot_posti' => $request->input('tot_posti'),
            'biglietti_prenotati' => 0,
            'locandina' => $imagePath
        ]);

        $ticket = Ticket::create([
            'idConcerto' => $concerto->id,
            'prezzo' => $request->input('prezzo')
        ]);

        return response()->json([
            'concerto creato'=>$concerto,
            'ticket relativo'=>$ticket
        ]);
    }

    public function update(Request $request, $id)
    {
        // return $request;
        // locandina
        if(is_string($request->input('locandina'))) {
            // Si tratta di una stringa, assumi che sia già un percorso di immagine
            $imagePath = $request->input('locandina');
        }
        else {
            $uploaded = $request->file('locandina');
            // return $uploaded;
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
        }

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
        // return $concerto;
        $concerto->save();

        return response()->json([
            'message' => 'Evento aggiornato con successo',
            'concerto' => $concerto
        ]);
    }

    public function destroy(string $id)
    {
        $concerto = Concert::find($id);
        $nome = $concerto->nome;
        $concerto->delete();
        return response()->json([
            'message'=>"concerto $nome eliminato"
        ]);
    }
}