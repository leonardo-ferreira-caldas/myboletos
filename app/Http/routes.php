<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', "AppController@index");
Route::get('dashboard', "AppController@index");
Route::get('clientes', "ClienteController@index");
Route::post('list-select', 'SelectFieldController@listar');
Route::post('grid/listar', 'GridController@listar');