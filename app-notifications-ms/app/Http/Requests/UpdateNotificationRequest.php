<?php

namespace App\Http\Requests;

use App\Exceptions\ParameterNotFoundException;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *     schema="UpdateNotificationRequest",
 *     required={"title", "description", "author", "idUser", "seen", "dateSeen", "alias", "published", "status"},
 *     @OA\Property(property="title", type="string", example="Updated Title"),
 *     @OA\Property(property="description", type="string", example="Updated Description"),
 *     @OA\Property(property="author", type="string", example="Updated Author"),
 *     @OA\Property(property="idUser", type="integer", example=1),
 *     @OA\Property(property="seen", type="boolean", example=true),
 *     @OA\Property(property="dateSeen", type="string", format="date", example="2023-08-23"),
 *     @OA\Property(property="alias", type="string", example="Updated Alias"),
 *     @OA\Property(property="published", type="boolean", example=true),
 *     @OA\Property(property="status", type="boolean", example=true),
 * )
 */
class UpdateNotificationRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'author' => 'required|max:255',
            'idUser' => 'required|integer',
            'seen' => 'nullable|boolean',
            'dateSeen' => 'nullable|date',
            'alias' => 'required|string|max:50',
            'published' => 'required|boolean',
            'status' => 'required|boolean',
        ];
    }

    public function messages(): array
    {
        return [

            'title.required' => 'The [title] parameter is required.',
            'title.string' => 'The [title] parameter is in an invalid format.',
            'title.max' => 'The [title] parameter must be at most 50 characters.',

            'description.required' => 'The [description] parameter is required.',
            'description.string' => 'The [description] parameter is in an invalid format.',
            'description.max' => 'The [description] parameter must be at most 1000 characters.',

            'author.required' => 'The [author] parameter is required.',
            'author.string' => 'The [author] parameter is in an invalid format.',
            'author.max' => 'The [author] parameter must be at most 50 characters.',

            'idUser.required' => 'The [author] parameter is required.',

            'dateSeen.date' => 'The [dateSeen] parameter is in an invalid format.',

            'alias.required' => 'The [alias] parameter is required.',
            'alias.string' => 'The [alias] parameter is in an invalid format.',
            'alias.max' => 'The [alias] parameter must be at most 50 characters.',

            'published.required' => 'The [published] parameter is required.',

            'status.required' => 'The [status] parameter is required.',

        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $errors = implode("\n ", $validator->errors()->all());
        throw new ParameterNotFoundException($errors);
    }
}
