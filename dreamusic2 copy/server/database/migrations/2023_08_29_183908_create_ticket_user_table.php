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
        Schema::create('ticket_user', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("idTicket");
            $table->unsignedBigInteger("idUser");
            $table->integer("quantita")->default(1);
            $table->string("posto")->nullable(); //per adesso nullable
            $table->string("stato")->default("prenotato");
            
            $table->foreign("idTicket")->references("id")->on("tickets");
            $table->foreign("idUser")->references("id")->on("users");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_user');
    }
};
