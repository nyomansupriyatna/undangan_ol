<?php

namespace App\Http\Controllers;

use App\Models\Ucapan;
use App\Http\Controllers\Controller;
use App\Http\Requests\UcapanFormRequest;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UcapanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ucapans = Ucapan::latest()->get()->map(fn($ucapan) =>
        [
            'id' => $ucapan->id,
            'nama' => $ucapan->nama,
            'ucapan' => $ucapan->ucapan,
            'keterangan' => $ucapan->keterangan,
            'created_at' => $ucapan->created_at->format('d M Y'),
        ]);

        return Inertia::render('ucapans/index', [
            'ucapans' => $ucapans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('ucapans/ucapan-form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UcapanFormRequest $request)
    {
        // dd($request);

        try {
            $ucapan = Ucapan::create([
                'nama' => $request->nama,
                'ucapan' => $request->ucapan,
                'keterangan' => $request->keterangan,
            ]);

            if ($ucapan) {
                return redirect()->route('ucapans.index')->with('success', 'ucapan created successfully.');
            }

            return redirect()->route('ucapans.index')->with('error', 'Unable to create ucapan. Please try again.');
        } catch (Exception $e) {
            Log::error('ucapan creation failed : ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Ucapan $ucapan)
    {
        return Inertia::render('ucapans/ucapan-form', [

            'ucapan' => $ucapan,
            'isView' => true,

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ucapan $ucapan)
    {
        return Inertia::render('ucapans/ucapan-form', [

            'ucapan' => $ucapan,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UcapanFormRequest $request, ucapan $ucapan)
    {
        try {
            if ($ucapan) {
                $ucapan->nama = $request->nama;
                $ucapan->ucapan = $request->ucapan;
                $ucapan->keterangan = $request->keterangan;

                $ucapan->save();
                return redirect()->route('ucapans.index')->with('success', 'ucapan updated successfully.');
            }
        } catch (Exception $e) {
            Log::error('ucapan deleted failed' . $e->getMessage());
        }

        return redirect()->back()->with('error', 'Unable to update ucapan. Please try again!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ucapan $ucapan)
    {
        try {
            if ($ucapan) {
                $ucapan->delete();
                return redirect()->back()->with('success', 'ucapan deleted successfully.');
            }
        } catch (Exception $e) {
            Log::error('ucapan deleted failed' . $e->getMessage());
        }


        return redirect()->back()->with('error', 'Unable to delete ucapan. Please try again!');
    }
}
