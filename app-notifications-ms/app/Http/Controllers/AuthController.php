<?php

namespace App\Http\Controllers;

use App\Exceptions\AuthLoginInvalidCredentialsException;
use App\Exceptions\AuthTokenNotFoundRequestException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AuthController extends Controller
{

    /**
     * @OA\Post(
     *      path="/api/auth/login",
     *      summary="Login user",
     *      tags={"Authentication"},
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *              @OA\Property(property="email", type="string", format="email", example="user@example.com"),
     *              @OA\Property(property="password", type="string", format="password", example="password123")
     *          )
     *      ),
     *      @OA\Response(response=200, description="Successful login"),
     *      @OA\Response(response=401, description="Unauthorized")
     * )
     */
    public function login(Request $request): JsonResponse
    {
        $credentials = ["email" => $request->get('email'), "password" => $request->get('password')];

        if (!Auth::attempt($credentials)) {
            throw new AuthLoginInvalidCredentialsException('Credentials not match');
        }

        $tokenLogin = auth()->user()->createToken(auth()->user()->email)->plainTextToken;

        return response()->json(
            ["token" => $tokenLogin],
            Response::HTTP_OK
        );
    }

    /**
     * @OA\Post(
     *      path="/api/auth/logout",
     *      summary="Logout user",
     *      tags={"Authentication"},
     *      @OA\Response(response=200, description="Successful logout"),
     *      @OA\Response(response=401, description="Unauthorized")
     * )
     */
    public function logout(Request $request):JsonResponse
    {
        $tokenInRequest = request()->bearerToken();

        if (empty($tokenInRequest)) {
            throw new AuthTokenNotFoundRequestException("Unable to get token in request");
        }

        $idToken = (int)Str::before($tokenInRequest, '|');

        $logout = auth()->user()->tokens()->where('id', $idToken)->delete();

        if ($logout) {

            return response()->json(
                ["message" => 'Tokens Revoked'],
                Response::HTTP_OK
            );
        }

        return response()->json(
            false,
            Response::HTTP_INTERNAL_SERVER_ERROR
        );

    }

    /**
     * @OA\Get(
     *      path="/api/auth/user",
     *      summary="Get authenticated user",
     *      tags={"Authentication"},
     *      @OA\Response(response=200, description="Successful operation"),
     *      @OA\Response(response=401, description="Unauthorized"),
     *      security={{"sanctum": {}}},
     * )
     */
    public function getUser(Request $request):JsonResponse
    {
        return response()->json(
            auth()->user(),
            Response::HTTP_OK
        );
    }
}
