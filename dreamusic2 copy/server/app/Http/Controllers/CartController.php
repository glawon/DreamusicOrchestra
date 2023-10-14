<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function mycart(){
        $user = Auth::user();
        $cart = Cart::where('idUser', $user->id)->get();
        return response()->json([
            'cart'=>$cart
        ]);
    }
}
