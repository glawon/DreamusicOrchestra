<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\TicketUser;
use App\Models\User;
use Illuminate\Http\Request;

class TicketUserController extends Controller
{

    public function prova(){
        $ticket = TicketUser::with('ticket.concert', 'user')->get();
        return $ticket;
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
        try{
        $request->validate([
            'idConcerto' => 'required|exists:concert,id',
            'nome' => 'required|string',
            'cognome' => 'required|string',
            'email' => 'required|string',
            'quantita' => 'integer|max:10'
        ]);}
        catch(\Exception $e){
            return response()->json([
                'message'=>"uno dei campi non è valido"
                ]);
        }

        $id_ticket = Ticket::where('idConcerto', $request->idConcerto)->first()->id;
        $id_user = User::where('email', $request->input('email'))->first()->id;

        $ticketUser = TicketUser::insert([
            'idTicket' => $id_ticket,
            'idUser' => $id_user,
            'quantita' => $request->input('quantita'),
        ]);

        // $ticketUser->save();

        return response()->json([
            'ticket prenotato'=>$ticketUser
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
