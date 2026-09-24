<?php
declare(strict_types=1);

// Typed models for the IpAddress SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** BulkQueryIp entity data model. */
class BulkQueryIp
{
    public ?string $id = null;
    public ?string $ip = null;
    public ?string $isp = null;
    public ?array $location = null;
    public ?array $risk = null;
}

/** Request payload for BulkQueryIp#list. */
class BulkQueryIpListMatch
{
    public string $id;
    public ?string $format = null;
}

/** GetCurrentIp entity data model. */
class GetCurrentIp
{
}

/** Request payload for GetCurrentIp#load. */
class GetCurrentIpLoadMatch
{
    public ?string $format = null;
}

/** GetIpIntelligence entity data model. */
class GetIpIntelligence
{
    public ?string $id = null;
    public ?string $ip = null;
    public ?string $isp = null;
    public ?array $location = null;
    public ?array $risk = null;
}

/** Request payload for GetIpIntelligence#load. */
class GetIpIntelligenceLoadMatch
{
    public string $id;
    public ?string $format = null;
}

