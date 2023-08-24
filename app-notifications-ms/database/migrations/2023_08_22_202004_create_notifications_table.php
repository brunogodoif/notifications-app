<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_notice');
            $table->string('alias');
            $table->boolean('published')->default(false);
            $table->boolean('status')->default(false);
            $table->timestamp('inactivation_date')->nullable(true);
            $table->string('inactivation_reason')->nullable(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('notifications');
    }
};
