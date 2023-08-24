<?php

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource('/notifications', NotificationController::class)->parameters([
    'notifications' => 'id'
]);
Route::patch('notifications/{id}/activate', [NotificationController::class, 'activate'])->name('notifications.activate');
Route::patch('notifications/{id}/deactivate', [NotificationController::class, 'deactivate'])->name('notifications.deactivate');
Route::patch('notifications/{id}/republish', [NotificationController::class, 'republish'])->name('notifications.republish');
