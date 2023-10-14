<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketUser extends Model
{
    use HasFactory;
    protected $table = 'ticket_user';
    protected $fillable = ['idTicket', 'idUser', 'quantita'];

    //hasone users
    //hasone tickets
    public function user(){
        return $this->hasOne(User::class, 'id', 'idUser');
    }
    public function ticket(){
        return $this->hasOne(Ticket::class, 'id', 'idTicket');
    }
}
