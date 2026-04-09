<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')
    ->name('api.v1.')
    ->group(function () {

        Route::controller( ApiController::class )
            ->group( function () {

                Route::name('introduction')->post(
                    'introduction',
                    'introduction'
                );

                Route::prefix('{conversation}')
                    ->name('conversation.')
                    ->group( function () {

                        Route::name('mindset')->post(
                            'mindset',
                            'mindset'
                        );

                        Route::name('identify-objective')->post(
                            'identify-objective',
                            'identifyObjective'
                        );

                        Route::name('confirm-objective')->post(
                            'confirm-objective',
                            'confirmObjective'
                        );

                    })
                ;
            })
        ;
    })
;


