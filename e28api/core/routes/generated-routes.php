<?php 
Route::get('/favorite', [App\Http\Controllers\GeneratedControllers\FavoriteController::class, 'index']);
Route::get('/favorite/query', [App\Http\Controllers\GeneratedControllers\FavoriteController::class, 'query']);
Route::get('/favorite/{id}', [App\Http\Controllers\GeneratedControllers\FavoriteController::class, 'show']);
Route::post('/favorite', [App\Http\Controllers\GeneratedControllers\FavoriteController::class, 'store']);
Route::put('/favorite/{id}', [App\Http\Controllers\GeneratedControllers\FavoriteController::class, 'update']);
Route::delete('/favorite/{id}', [App\Http\Controllers\GeneratedControllers\FavoriteController::class, 'destroy']);Route::get('/track', [App\Http\Controllers\GeneratedControllers\TrackController::class, 'index']);
Route::get('/track/query', [App\Http\Controllers\GeneratedControllers\TrackController::class, 'query']);
Route::get('/track/{id}', [App\Http\Controllers\GeneratedControllers\TrackController::class, 'show']);
Route::post('/track', [App\Http\Controllers\GeneratedControllers\TrackController::class, 'store']);
Route::put('/track/{id}', [App\Http\Controllers\GeneratedControllers\TrackController::class, 'update']);
Route::delete('/track/{id}', [App\Http\Controllers\GeneratedControllers\TrackController::class, 'destroy']);