<?php

namespace App\Http\Controllers;

use App\Models\Concert;
use App\Models\Ticket;
use App\Models\TicketUser;
use App\Models\User;
use Illuminate\Http\Request;

class TicketUserController extends Controller
{

    public function index(){
        $tickets = TicketUser::with('ticket.concert', 'user')->get();
        return $tickets;
    }

    public function store(Request $request)
    {
        try{
        $request->validate([
            'idConcerto' => 'required|exists:concert,id',
            'nome' => 'required|string',
            'cognome' => 'required|string',
            'email' => 'required|string|email',
            'quantita' => 'integer|max:10',
            'posto' => 'nullable|string' //sostituire nullable con required poi quando sarà
        ]);}
        catch(\Exception $e){
            return response()->json([
                'message'=>"uno dei campi non è valido"
                ]);
        }

        $id_ticket = Ticket::where('idConcerto', $request->idConcerto)->first()->id;
        $id_user = User::where('email', $request->input('email'))->first()->id;

        if (!$id_ticket || !$id_user) {
            return response()->json([
                'message' => "biglietto o utente non trovato"
            ], 404);
        }
        

        $ticketUser = TicketUser::create(
            [
                'idTicket' => $id_ticket,
                'idUser' => $id_user,
                'quantita' => $request->input('quantita'),
                'posto'=> $request->posto
            ]
        );

        $ticketUser->save();

        if($ticketUser){
            $concerto = Concert::find($id_ticket);
            $new_quantita = $concerto->biglietti_prenotati + $ticketUser->quantita;
            $concerto->update(['biglietti_prenotati' => $new_quantita]);
        }

        return response()->json([
            'ticket prenotato'=>$ticketUser
        ]);
    }

    public function purchase(string $id){
        $ticketuser = TicketUser::find($id);
        $ticketuser->stato = 'acquistato';
        $ticketuser->save();
        return response()->json([
            'message'=>'biglietto acquistato'
        ]);
    }

    public function edit(string $id)
    {
        $ticketuser = TicketUser::find($id);
        return response()->json([
            'ticket-utente selezionato per la modifica'=>$ticketuser
        ]);
    }

    public function update(Request $request, string $id)
    {
        $ticketuser = TicketUser::find($id);
        $oldticket = $ticketuser->replicate();
        $ticketuser->idTicket = $request->idConcerto; //molto sporco, ma per motivi di tempo va bene, perchè idConcerto corrisponde a idTicket
        $ticketuser->idUser = User::where('email', $request->input('email'))->first()->id;
        $ticketuser->quantita = $request->quantita;
        $ticketuser->save();
        return response()->json(
            [
                'messaggio' => 'biglietto modificato con successo',
                // 'vecchio biglietto' => $oldticket,
                'nuovo biglietto' => $ticketuser
            ]
        );

    }

    public function destroy(string $id)
    {
        $ticket = TicketUser::find($id);
        $ticket->delete();
        return response()->json(
            [
                'messaggio'=>'biglietto eliminato con successo'
            ]
        );
    }
}
