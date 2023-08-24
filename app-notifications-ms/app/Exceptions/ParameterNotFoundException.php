<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Response;

class ParameterNotFoundException extends Exception
{
    public function render()
    {
        return response()->json(["exception" => get_class($this), "message" => $this->getMessage(), "trace" => $this->getTrace()], Response::HTTP_BAD_REQUEST);
    }
}
