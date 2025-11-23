<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UcapanFormRequest;
use Illuminate\Http\Request;
use App\Models\Ucapan;
use Exception;
use Illuminate\Container\Attributes\Log;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class UndanganController extends Controller
{
    public function index()
    {

        $ucapans = Ucapan::latest()->get()->map(fn($ucapan) =>
        [
            'id' => $ucapan->id,
            'nama' => $ucapan->nama,
            'ucapan' => $ucapan->ucapan,
            'created_at' => Carbon::parse($ucapan->created_at)->diffForHumans(),
        ]);

        return Inertia::render('undangan', [
            'ucapans' => $ucapans,
        ]);
    }

    public function store(UcapanFormRequest $request)
    {

        try {
            $ucapan = Ucapan::create([
                'nama' => $request->nama,
                'ucapan' => $request->ucapan,
            ]);

            // if ($ucapan) {
            //     // return redirect()->route('/');
            // }

            // return redirect()->route('/')->with('error', 'Unable to create ucapan. Please try again.');
        } catch (Exception $e) {
        }
    }
}
