<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    public function register(Request $request)
    {
        // $user = User::create([
        //     'nome'=>$request->nome,
        //     'cognome'=>$request->cognome,
        //     'password'=> Hash::make($request->password)
        // ]);

        try{
            $request->validate([
                'nome'=>'required|string',
                'cognome'=>'required|string',
                'email'=>'required|email|unique:users',
                'password'=>'required|string',
                'ruolo'=>'required|string'
            ]);

            $user = User::create($request->all());
            return response()->json([
            'user'=>$user,
            'logged'=>true
            ]);
        } 
        catch(\Exception $e){
            return response()->json([
                'message'=>"c'è stato un errore",
                'logged'=>false
                ]);
        }
    }

    public function login(Request $request)
    {
        // $request->password = Hash::make($request->password);
        // $user = User::where('email', $request->email)->first();
        $token= Auth::attempt($request->all());
        $user = Auth::user();
        return response()->json([
            'user'=>$user,
            'logged'=>$token
            ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
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
