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
        Schema::create('concert', function (Blueprint $table) {
            $table->id();
            $table->date("data");
            $table->time("ora");
            $table->string("locandina")->nullable();
            $table->string("citta");
            $table->string("teatro");
            $table->string("nome");
            $table->text("programma");
            $table->integer("tot_posti");
            $table->integer("biglietti_prenotati")->default('0');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('concert');
    }
};
