<?php

namespace App\Http\Controllers;

use App\Models\GalleryImages;
use App\Models\Image;
use App\Models\MusicianImages;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function uploadImageMusicisti(Request $request)
    {
        // Codice per gestire il caricamento delle immagini
        // Memorizza il percorso dell'immagine nel database

        // Caricamento e salvataggio di un'immagine
        $uploaded = $request->file('immagine');
        $imageName = $uploaded->getClientOriginalName();
        $imagePath = 'musicisti/' . $imageName;
        $uploaded->storeAs('public', $imageName);

        $image = new MusicianImages;
        $image->nome = $imageName;
        $image->percorso = $imagePath;
        $image->save();

        // Restituisci una risposta o reindirizza come necessario
    }

    public function getAllMusicisti(){
        $images = MusicianImages::all();
        if (!$images) {
            return response()->json([
                'errore'=>"immagini non pervenute"
            ]);
        }
        return response()->json([
            'musicisti'=> $images
        ]);
    }

    public function getAllGallery(){
        $images = GalleryImages::all();
        if (!$images) {
            return response()->json([
                'errore'=>"immagini non pervenute"
            ]);
        }
        return response()->json([
            'gallery'=> $images
        ]);
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

