<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\UcapanController;
use App\Http\Controllers\UndanganController;
use App\Models\Ucapan;
use Illuminate\Support\Carbon;


Route::post('/', [UndanganController::class, 'store'])->name('ucapan.simpan');

Route::get('/', function () {

    $ucapans = Ucapan::latest()->get()->map(fn($ucapan) =>
    [
        'id' => $ucapan->id,
        'nama' => $ucapan->nama,
        'ucapan' => $ucapan->ucapan,
        'created_at' => Carbon::parse($ucapan->created_at)->diffForHumans(),
    ]);

    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'ucapans' => $ucapans,
    ]);
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('profiles', ProfileController::class);
    Route::resource('ucapans', UcapanController::class);
});

require __DIR__ . '/settings.php';
