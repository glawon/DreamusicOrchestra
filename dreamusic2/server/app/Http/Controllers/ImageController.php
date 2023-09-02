<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function uploadImage(Request $request)
    {
        // Codice per gestire il caricamento delle immagini
        // Memorizza il percorso dell'immagine nel database

        // Caricamento e salvataggio di un'immagine
        $uploaded = $request->file('immagine');
        $imageName = $uploaded->getClientOriginalName();
        $imagePath = '/public/images' . $imageName;
        $uploaded->storeAs('public', $imagePath);

        $image = new Image;
        $image->nome = $imageName;
        $image->percorso = $imagePath;
        $image->save();

        // Restituisci una risposta o reindirizza come necessario
    }

    public function getImage($id)
    {
        // Codice per recuperare e visualizzare un'immagine dal database

        $image = Image::find($id);

        if (!$image) {
            // Immagine non trovata, gestisci l'errore
        }

        // Costruisci l'URL completo per l'immagine basato sul percorso salvato nel database
        $imageUrl = asset('storage/' . $image->percorso);

        // Restituisci l'URL dell'immagine o visualizza l'immagine come necessario
    }

    public function deleteImage($id)
    {
        // Codice per eliminare un'immagine dal database e dal sistema di archiviazione

        $image = Image::find($id);

        if ($image) {
            // Elimina l'immagine dal sistema di archiviazione
            // Elimina l'immagine dal database
            $image->delete();
        } else {
            // Immagine non trovata, gestisci l'errore
        }

        // Restituisci una risposta o reindirizza come necessario
    }
}

