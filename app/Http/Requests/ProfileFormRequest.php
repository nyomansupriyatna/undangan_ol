<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama_profile' => 'required|string|max:255',
            'alamat_profile' => 'required|string|max:1000',
            'phone_profile' => 'required|string|max:255',
            'foto_awal' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ];
    }

    public function messages(): array
    {
        return [
            'nama_profile.required' => 'Please enter the profile name',
            'nama_profile.string' => 'The Profile name must be a string',
            'nama_profile.max' => 'The Profile name may not be greater than 255 character',
            'alamat_profile.required' => 'Please enter the profile address',
            'alamat_profile.string' => 'The profile address must be a string',
            'alamat_profile.max' => 'The Profile address may not be greater than 255 character',
            'phone_profile.required' => 'Please enter the profile phone',
            'phone_profile.string' => 'The profile phone must be a string',
            'phone_profile.max' => 'The Profile phone may not be greater than 255 character',
            'foto_awal.image' => 'The main foto must be an image file',
            'foto_awal.mimes' => 'main foto must be a file of type: jpeg, jpg, png, gif',
            'foto_awal.max' => 'The main foto may not be greater than 2040 KB.'
        ];
    }
}
