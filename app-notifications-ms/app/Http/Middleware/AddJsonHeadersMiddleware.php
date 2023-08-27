<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AddJsonHeadersMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->url() !== route('l5-swagger.default.api')) {

            if (!$request->header('Content-Type') || $request->header('Content-Type') !== 'application/json') {
                $request->headers->set('Content-Type', 'application/json');
            }

            if (!$request->header('Accept') || $request->header('Accept') !== 'application/json') {
                $request->headers->set('Accept', 'application/json');
            }

            return $next($request);

        }

        return $next($request);
    }
}
