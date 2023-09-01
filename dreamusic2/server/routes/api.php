<?php

use App\Http\Controllers\ConcertController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\MusicianController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\CartController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::controller(ConcertController::class)->prefix('concert')->group(function($router){
    Route::get('{id}/show', 'show');
    Route::get('index', 'index');
});

Route::controller(UserController::class)->prefix('user')->group(function($router){
    Route::post('register', 'register');
    Route::post('login', 'login');
});

Route::controller(ShopController::class)->prefix('shop')->group(function($router){
    Route::get('index', 'index'); //per mostrare tutti gli items nello shop
});

Route::controller(TicketController::class)->prefix('tickets')->group(function($router){
    Route::get('prova', 'prova');
});

Route::controller(ItemController::class)->prefix('items')->group(function($router){
    Route::get('index', 'index');
});

Route::controller(CartController::class)->prefix('carts')->group(function($router){
    Route::get('mycart', 'mycart');
});

Route::controller(MusicianController::class)->prefix('musicians')->group(function($router){
    Route::get('index', 'index'); //mostro tutti i musicisti
    Route::post('store', 'store'); //aggiunta di nuovi 
    Route::delete('{id}/delete', 'destroy'); // elimina musicisti
    Route::get('{id}/edit', 'edit'); //pagina di modifica del musicista
    Route::put('{id}', 'update'); //effettiva modifica in DB 
});