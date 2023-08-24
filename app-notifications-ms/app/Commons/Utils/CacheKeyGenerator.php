<?php

namespace App\Commons\Utils;

class CacheKeyGenerator
{

    /**
     * @param array $requestData
     * @return string
     */
    public static function generateCacheKeyFromRequest(array $requestData, string $preKey = ""): string
    {
        ksort($requestData);
        if ($preKey != "") {
            $regex = "/[^a-zA-Z0-9]+/";
            $replacement = "-";
            $preKey = strtolower(preg_replace($regex, $replacement, $preKey));
            return $preKey . "-" . md5(serialize($requestData));
        }
        return md5(serialize($requestData));
    }
}
