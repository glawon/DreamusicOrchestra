<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Concert extends Model
{
    use HasFactory;
    use SoftDeletes;
    
    protected $table = 'concert';
    protected $fillable = [
        'data', 'ora', 'locandina', 'citta',
        'teatro', 'nome', 'programma', 'tot_posti', 'biglietti_prenotati', 
    ];
    public function tickets(){
        return $this->hasMany(Ticket::class, 'idConcerto', 'id');
    }


}
