<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileFormRequest;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $profiles = Profile::latest()->get()->map(fn($profile) =>
        [
            'id' => $profile->id,
            'nama_profile' => $profile->nama_profile,
            'alamat_profile' => $profile->alamat_profile,
            'phone_profile' => $profile->phone_profile,
            'foto_awal' => $profile->foto_awal,
            'created_at' => $profile->created_at->format('d M Y'),
        ]);

        return Inertia::render('profiles/index', [
            'profiles' => $profiles,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('profiles/profile-form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProfileFormRequest $request)
    {
        // dd($request);

        try {
            $fotoAwal = null;

            if ($request->file('foto_awal')) {
                $fotoAwal = $request->file('foto_awal');
                $fotoAwalOriginalName = $fotoAwal->getClientOriginalName();
                $fotoAwal = $fotoAwal->store('profiles', 'public');
            }


            $profile = Profile::create([
                'nama_profile' => $request->nama_profile,
                'alamat_profile' => $request->alamat_profile,
                'phone_profile' => $request->phone_profile,
                'foto_awal' => $fotoAwal,
                // 'foto_awal_original_name' => $request->fotoAwalOriginalName,
            ]);

            if ($profile) {
                return redirect()->route('profiles.index')->with('success', 'Profile created successfully.');
            }

            return redirect()->route('profiles.index')->with('error', 'Unable to create profile. Please try again.');
        } catch (Exception $e) {
            Log::error('Profile creation failed : ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Profile $profile)
    {
        return Inertia::render('profiles/profile-form', [

            'profile' => $profile,
            'isView' => true,

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Profile $profile)
    {
        return Inertia::render('profiles/profile-form', [

            'profile' => $profile,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProfileFormRequest $request, Profile $profile)
    {
        try {
            if ($profile) {
                $profile->nama_profile = $request->nama_profile;
                $profile->alamat_profile = $request->alamat_profile;
                $profile->phone_profile = $request->phone_profile;

                if ($request->file('foto_awal')) {
                    $fotoAwal = $request->file('foto_awal');
                    $fotoAwalOriginalName = $fotoAwal->getClientOriginalName();
                    $fotoAwal = $fotoAwal->store('profiles', 'public');

                    $profile->foto_awal = $request->$fotoAwal;
                }

                $profile->save();
                return redirect()->route('profiles.index')->with('success', 'Profile updated successfully.');
            }
        } catch (Exception $e) {
            Log::error('Profile deleted failed' . $e->getMessage());
        }

        return redirect()->back()->with('error', 'Unable to update profile. Please try again!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Profile $profile)
    {
        try {
            if ($profile) {
                $profile->delete();
                return redirect()->back()->with('success', 'Profile deleted successfully.');
            }
        } catch (Exception $e) {
            Log::error('Profile deleted failed' . $e->getMessage());
        }


        return redirect()->back()->with('error', 'Unable to delete profile. Please try again!');
    }
}
