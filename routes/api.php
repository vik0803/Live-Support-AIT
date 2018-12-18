<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Authentication routes
Route::group([

	'prefix' => 'auth'

], function() {

	Route::post('me', 'AuthController@me');
	Route::post('logout', 'AuthController@logout');
	Route::post('refresh', 'AuthController@refresh');
	Route::post('login', 'AuthController@login');
	Route::post('register', 'AuthController@register');

});
