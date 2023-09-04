<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;

class UserController extends Controller
{
    
    public function index(){
        $users = User::all();
        return response()->json(
            [
                'users'=>$users
            ]
        );
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
            $token = Auth::attempt($request->all());
            return response()->json([
            'user'=>$user,
            'token'=>$token
            ]);
        } 
        catch(\Exception $e){
            return response()->json([
                'message'=>"c'è stato un errore",
                'token'=>false
                ]);
        }
    }

    public function login(Request $request)
    {
        // $request->password = Hash::make($request->password);
        // $user = User::where('email', $request->email)->first();

        $token = Auth::attempt($request->all());
        Cookie::queue('bearer_token', $token, 60);
        $user = Auth::user();
        // $token2 = $user->createToken('token')->plainTextToken;
        return response()->json([
            'user'=>$user,
            'token'=> $token
        ]);
    }

    public function show(string $id)
    {
        $user = User::find($id);
        return response()->json(
            [
                'user'=>$user
            ]
        );
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'nome'=>'required|string',
            'cognome'=>'required|string',
            'email'=>'required|email',  //|unique:users
            'password'=>'required|string'
        ]);

        $user = User::find($id);
        // $olduser = $user->replicate();

        $user->nome = $request->nome;
        $user->cognome = $request->cognome;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->save();

        return response()->json(
            [
                'messaggio' => 'user aggiornato con successo',
                // 'old user' => $olduser,
                'new user' => $user
            ]
        );
    }

    public function edit(string $id)
    {
        $user = User::find($id);
        return response()->json([
            'user selezionato per la modifica'=>$user
        ]);
    }

    public function destroy(string $id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json(
            [
                'messaggio' => 'user eliminato con successo'
            ]
        );
    }
}