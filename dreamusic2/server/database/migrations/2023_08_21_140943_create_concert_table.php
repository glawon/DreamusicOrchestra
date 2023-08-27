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
            $table->string("locandina");
            $table->string("citta");
            $table->string("teatro");
            $table->string("nome");
            $table->text("programma");
            $table->integer("totPosti");
            $table->double("incasso")->default('0');
            $table->integer("bigliettiVenduti")->default('0');
            $table->timestamps();
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
