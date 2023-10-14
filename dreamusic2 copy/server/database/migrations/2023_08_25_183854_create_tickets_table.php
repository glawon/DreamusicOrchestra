<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("idConcerto");
            $table->double("prezzo");
            //aggiungere tipologia: tribuna o platea
            //$table->string("posto"); //tipo A2
            //$table->boolean("stato")->nullable();
            
            $table->foreign("idConcerto")->references("id")->on("concert");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
