<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;
    protected $table = 'tickets';
    protected $fillable = ['idConcerto', 'prezzo'];
    public function concert(){
        return $this->hasOne(Concert::class, 'id', 'idConcerto');
    }
    
    //hasmany TicketUser
    public function ticket_user(){
        return $this->hasMany(TicketUser::class, 'idTicket', 'id');
    }
}