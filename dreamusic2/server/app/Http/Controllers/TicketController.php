<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\Concert;
use App\Models\TicketUser;
use App\Models\User;
use Illuminate\Http\Request;

class TicketController extends Controller
{

    // public function prova(){
    //     $ticket = Ticket::find(1);
    //     return $ticket->concert;
    // }

    public function prova(){
        $userId = 2;
        $bigliettiUtente = User::with('ticket_user.ticket.concert')->find($userId);
        //$ticket = TicketUser::with('ticket.concert', 'user')->get();
        return $bigliettiUtente;
    }



    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
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
