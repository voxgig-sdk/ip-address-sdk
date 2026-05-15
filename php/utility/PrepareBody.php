<?php
declare(strict_types=1);

// IpAddress SDK utility: prepare_body

class IpAddressPrepareBody
{
    public static function call(IpAddressContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
