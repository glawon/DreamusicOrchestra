<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory;
    protected $table = 'scores';

    //polimorfico
    public function items(){
        return $this->morphOne(Item::class, 'oggettificabile');
    }
}
