<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NotificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'auth', 'as' => 'auth.'], function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout')->middleware(['auth:sanctum']);
    Route::get('/user', [AuthController::class, 'getUser'])->name('getUser')->middleware(['auth:sanctum']);
});

Route::middleware(["auth:sanctum"])->group(function () {

    Route::apiResource('/notifications', NotificationController::class)->parameters([
        'notifications' => 'id'
    ]);

    Route::patch('notifications/{id}/activate', [NotificationController::class, 'activate'])->name('notifications.activate');
    Route::patch('notifications/{id}/deactivate', [NotificationController::class, 'deactivate'])->name('notifications.deactivate');
    Route::patch('notifications/{id}/republish', [NotificationController::class, 'republish'])->name('notifications.republish');

});

