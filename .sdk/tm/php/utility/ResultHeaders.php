<?php
declare(strict_types=1);

// IpAddress SDK utility: result_headers

class IpAddressResultHeaders
{
    public static function call(IpAddressContext $ctx): ?IpAddressResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
