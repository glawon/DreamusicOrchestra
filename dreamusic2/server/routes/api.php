<?php

use App\Http\Controllers\ConcertController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TicketController;


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
    Route::get('index', 'index');
});

Route::controller(TicketController::class)->prefix('tickets')->group(function($router){
    Route::get('prova', 'prova');
});

