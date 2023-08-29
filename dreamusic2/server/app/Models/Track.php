<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Track extends Model
{
    use HasFactory;
    protected $table = 'tracks';

    //polimorfico
    public function items(){
        return $this->morphOne(Item::class, 'oggettificabile');
    }
}
