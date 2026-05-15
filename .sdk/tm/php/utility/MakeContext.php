<?php
declare(strict_types=1);

// IpAddress SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class IpAddressMakeContext
{
    public static function call(array $ctxmap, ?IpAddressContext $basectx): IpAddressContext
    {
        return new IpAddressContext($ctxmap, $basectx);
    }
}
