<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Score;
use App\Models\Track;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function index(){
        $items = Item::with('oggettificabile')->get(); //questo è per prendere anche le informazioni dell'oggetto in se
        return response()->json(
            [
                'status'=>'catalogo caricato con successo',
                'items'=>$items
            ]
        );
    }

    public function store (Request $request)
    {
        $data = $request->all();
        $itemCreato = null;

        if ($data['type'] == "score")
        {
            $itemCreato = Score::create($request->all());
            $data['oggettificabile_type'] = "App\Models\Score";
        }
        else if ($data['type'] == "track")
        {
            $itemCreato = Track::create($request->all());
            $data['oggettificabile_type'] = "App\Models\Track";
        }

        $data['oggettificabile_id'] = $itemCreato->id;
            
        $item = Item::create($data);
        //$item->save();
    }
}
