<?php
declare(strict_types=1);

// IpAddress SDK utility: result_body

class IpAddressResultBody
{
    public static function call(IpAddressContext $ctx): ?IpAddressResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
