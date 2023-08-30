<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Track;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $items = Item::all();
        // return response()->json(
        //     [
        //         'status'=>'catalogo caricato con successo',
        //         'items'=>$items
        //     ]
        // );

        $user2 = Auth::user();
        return $user2;

        $items = Item::with('oggettificabile')->get(); //questo è per prendere anche le informazioni dell'oggetto in se
        return response()->json(
            [
                'status'=>'catalogo caricato con successo',
                'items'=>$items
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
