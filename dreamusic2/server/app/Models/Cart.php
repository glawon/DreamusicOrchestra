<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $table = 'cart';

    public function users(){
        return $this->hasMany(User::class, 'idUser', 'id');
    }
    public function items(){
        return $this->hasMany(Item::class, 'idTicket', 'id');
    }
}
