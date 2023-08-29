<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Score;
use App\Models\Track;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function index(){
        $items = Item::all();
        return response()->json([
            "status" => "prodotti presi con successo",
            "prodotti" => $items
        ]);
    }
}
