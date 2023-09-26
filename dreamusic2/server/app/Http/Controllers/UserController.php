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

    public function register(Request $request){
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
                'confirm_password'=>'required|string',
                'ruolo'=>'required|string'
            ]);
        } 
        catch(\Exception $e){
            return response()->json([
                'message'=>"validazione errata, mail già in database",
                'token'=>false
                ]);
        }

        if($request->password ===  $request->confirm_password){
            $user = User::create($request->all());
            // $token = Auth::attempt($request->all());
            return response()->json([
            'user'=>$user,
            // 'token'=>$token
            ]);
        }else{
            return response()->json([
                'message'=>"validazione errata",
            ]);
        }
    }

    public function login(Request $request){
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

    public function show(string $id){
        $user = User::find($id);
        return response()->json(
            [
                'user'=>$user
            ]
        );
    }

    public function update(Request $request, string $id){
        // $request->validate([
        //     'nome'=>'required|string',
        //     'cognome'=>'required|string',
        //     'email'=>'required|email',  //|unique:users
        //     'password'=>'required|string'
        // ]);
        $request->validate([
            'old_password'=>'required|string',
            'new_password'=>'required|string',
            'confirm_password'=>'required|string'
        ]);

        $credentials = [
            'id' => $id,
            'password' => $request->input('old_password')
        ];

        $user = User::find($id);
        // $olduser = $user->replicate();
        
        // $user->nome = $request->nome;
        // $user->cognome = $request->cognome;
        // $user->email = $request->email;
        if(Auth::attempt($credentials)){
            if($request->new_password ===  $request->confirm_password){
                $user->password = $request->new_password;
                $user->save();
                return response()->json(
                    [
                        'messaggio' => 'user aggiornato con successo',
                        'new user' => $user
                    ]
                );
            }
            else{
                return response()->json(
                    [
                        'errore' => 'le nuove password non matchano'
                    ]
                );
            }            
        }else{
            return response()->json(
                [
                    'errore' => 'vecchia password sbagliata'
                ]
            );
        }
    }
    
    public function upgradeRole(string $id){
        $user = User::find($id);
        $user->ruolo = "admin";
        $user->save();
        return response()->json([
            'messaggio'=> 'user ' . $id . ' promosso ad admin'
        ]);
    }

    public function edit(string $id){
        $user = User::find($id);
        return response()->json([
            'user selezionato per la modifica'=>$user
        ]);
    }

    public function destroy(string $id){
        $user = User::find($id);
        $user->delete();
        return response()->json(
            [
                'messaggio' => 'user eliminato con successo'
            ]
        );
    }
}