<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Concert extends Model
{
    use HasFactory;
    protected $table = 'concert';
    public function tickets(){
        return $this->hasMany(Ticket::class, 'idConcerto', 'id');
    }
}
