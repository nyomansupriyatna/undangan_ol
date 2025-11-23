<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'nama_profile',
        'alamat_profile',
        'phone_profile',
        'email_profile',
        'nama_event',
        'tanggal_event',
        'foto_awal',
        'text_awal',
    ];
}
