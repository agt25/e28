<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrackTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tracks', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title')->nullable(); 
$table->string('artist')->nullable(); 
$table->integer('track')->nullable(); 
$table->string('categories')->nullable(); 
$table->string('genre')->nullable(); 
$table->boolean('liked')->nullable(); 
$table->boolean('skipped')->nullable(); 
$table->boolean('played')->nullable(); 

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tracks');
    }
}