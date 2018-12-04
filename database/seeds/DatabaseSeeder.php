<?php

use Illuminate\Database\Seeder;
use \App\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
    	$user = new User();
    	$user->name = "jelle";
    	$user->password = Hash::make('test');
    	$user->email = 'jelle@hotmail.com';
    	$user->save();

    	$user = new User();
    	$user->name = "admin";
    	$user->password = Hash::make('admin');
    	$user->email = 'admin@hotmail.com';
    	$user->save();
    }
}
