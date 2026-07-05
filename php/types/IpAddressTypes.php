<?php
declare(strict_types=1);

// Typed models for the IpAddress SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** BulkQueryIP entity data model. */
class BulkQueryIP
{
    public ?string $ip = null;
    public ?string $isp = null;
    public ?array $location = null;
    public ?array $risk = null;
}

/** Request payload for BulkQueryIP#list. */
class BulkQueryIPListMatch
{
    public string $id;
}

/** GetCurrentIp entity data model. */
class GetCurrentIp
{
}

/** Request payload for GetCurrentIp#load. */
class GetCurrentIpLoadMatch
{
}

/** GetIpIntelligence entity data model. */
class GetIpIntelligence
{
    public ?string $ip = null;
    public ?string $isp = null;
    public ?array $location = null;
    public ?array $risk = null;
}

/** Request payload for GetIpIntelligence#load. */
class GetIpIntelligenceLoadMatch
{
    public string $id;
}

