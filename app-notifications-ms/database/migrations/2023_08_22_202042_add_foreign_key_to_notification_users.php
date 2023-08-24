<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('notification_users', function (Blueprint $table) {
            $table->foreign('id_notification')->references('id')->on('notifications')->onDelete('cascade');
        });
        Schema::table('notification_users', function (Blueprint $table) {
            $table->foreign('id_user')->references('id')->on('users')->onDelete('no action');
        });
    }

    public function down()
    {
        Schema::table('notification_users', function (Blueprint $table) {
            $table->dropForeign(['id_notification']);
        });
        Schema::table('notification_users', function (Blueprint $table) {
            $table->dropForeign(['id_user']);
        });
    }
};
