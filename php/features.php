<?php
declare(strict_types=1);

// IpAddress SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class IpAddressFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new IpAddressBaseFeature();
            case "test":
                return new IpAddressTestFeature();
            default:
                return new IpAddressBaseFeature();
        }
    }
}
