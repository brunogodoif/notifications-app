<?php

namespace App\Http\Requests;

use App\Exceptions\ParameterNotFoundException;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *     schema="DeactivateNotificationRequest",
 *     required={"inactivationReason"},
 *     @OA\Property(property="inactivationReason", type="string", example="description of reason for inactivation"),
 * )
 */
class DeactivateNotificationRequest extends FormRequest
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
            'inactivationReason' => 'required|string|max:100',
        ];
    }

    public function messages(): array
    {
        return [
            'inactivation_reason.required' => 'The [alias] parameter is required.',
            'inactivation_reason.string' => 'The [alias] parameter is in an invalid format.',
            'inactivation_reason.max' => 'The [alias] parameter must be at most 50 characters.',

        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $errors = implode("\n ", $validator->errors()->all());
        throw new ParameterNotFoundException($errors);
    }
}
