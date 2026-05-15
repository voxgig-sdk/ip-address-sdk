<?php
declare(strict_types=1);

// IpAddress SDK utility: feature_add

class IpAddressFeatureAdd
{
    public static function call(IpAddressContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
