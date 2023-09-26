<?php

use App\Http\Controllers\ConcertController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\MusicianController;
use App\Http\Controllers\TicketUserController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\ItemController;
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


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

*/

Route::controller(ConcertController::class)->prefix('concert')->group(function($router){
    Route::get('index', 'index'); //fatta
    Route::get('{id}/show', 'show'); //fatta
    Route::get('{id}/edit', 'edit'); //fatta
    Route::put('{id}/update', 'update'); //fatta
    Route::post('store', 'store'); //fatta
    Route::delete('{id}/delete', 'destroy'); //fatta
});

Route::controller(UserController::class)->prefix('user')->group(function($router){
    Route::get('index', 'index'); //mostra tutti gli utenti
    Route::put('{id}/upgradeRole', 'upgradeRole');
    Route::get('{id}/show', 'show');  //mostra informazioni utente con {id}
    Route::put('{id}/update', 'update');
    Route::get('{id}/edit', 'edit');
    Route::delete('{id}/delete', 'destroy');  //eliminazione utente

    Route::post('register', 'register'); 
    Route::post('login', 'login');
});

Route::controller(TicketUserController::class)->prefix('ticket-user')->group(function($router){
    Route::get('index', 'index'); // mostra tutti i biglietti prenotati
    Route::post('book', 'store'); //prenotazione aggiunge un record in ticketUser
    Route::put('{id}/purchase', 'purchase'); //acquista il biglietto
    Route::delete('{id}/delete', 'destroy'); //elimina un biglietto con id {id}
    Route::get('{id}/edit', 'edit'); 
    Route::put('{id}/update', 'update');
});

Route::controller(TicketController::class)->prefix('tickets')->group(function($router){
    Route::get('show', 'showUserTicketsAndConcerts');
});

Route::controller(MusicianController::class)->prefix('musicians')->group(function($router){
    Route::get('index', 'index'); //mostro tutti i musicisti FATTO
    Route::post('store', 'store'); //aggiunta di nuovi FATTO
    Route::delete('{id}/delete', 'destroy'); // elimina musicisti FATTO
    Route::get('{id}/edit', 'edit'); //pagina di modifica del musicista FATTO
    Route::put('{id}/update', 'update'); //effettiva modifica in DB FATTO
});

Route::controller(ImageController::class)->prefix('images')->group(function($router){
    // Route::get('musicisti','getAllMusicisti');
    Route::get('gallery','getAllGallery');
});

/*
Route::controller(ShopController::class)->prefix('shop')->group(function($router){
    Route::get('index', 'index'); //per mostrare tutti gli items nello shop
});

Route::controller(ItemController::class)->prefix('items')->group(function($router){
    Route::get('index', 'index');
});

Route::controller(CartController::class)->prefix('carts')->group(function($router){
    Route::get('mycart', 'mycart');
});
*/