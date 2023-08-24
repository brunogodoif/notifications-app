<?php

namespace App\Commons\Traits;


use Illuminate\Support\Str;

class CamelAndSnakeConverter
{
    public static function toCamelCase(array $arrayData): array
    {
        $finalArray = array();
        foreach ($arrayData as $key => $value):
            $key = Str::camel($key);
            if (!is_array($value))
                $finalArray[$key] = $value;
            else
                $finalArray[$key] = CamelAndSnakeConverter::toCamelCase($value);
        endforeach;
        return $finalArray;
    }

    public static function toSnakeCase(array $arrayData): array
    {
        $finalArray = array();
        foreach ($arrayData as $key => $value):
            $key = Str::snake($key);
            if (!is_array($value))
                $finalArray[$key] = $value;
            else
                $finalArray[$key] = CamelAndSnakeConverter::toSnakeCase($value);
        endforeach;
        return $finalArray;
    }


}
