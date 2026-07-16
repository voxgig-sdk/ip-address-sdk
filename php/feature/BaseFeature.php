<?php
declare(strict_types=1);

// IpAddress SDK base feature

class IpAddressBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(IpAddressContext $ctx, array $options): void {}
    public function PostConstruct(IpAddressContext $ctx): void {}
    public function PostConstructEntity(IpAddressContext $ctx): void {}
    public function SetData(IpAddressContext $ctx): void {}
    public function GetData(IpAddressContext $ctx): void {}
    public function GetMatch(IpAddressContext $ctx): void {}
    public function SetMatch(IpAddressContext $ctx): void {}
    public function PrePoint(IpAddressContext $ctx): void {}
    public function PreSpec(IpAddressContext $ctx): void {}
    public function PreRequest(IpAddressContext $ctx): void {}
    public function PreResponse(IpAddressContext $ctx): void {}
    public function PreResult(IpAddressContext $ctx): void {}
    public function PreDone(IpAddressContext $ctx): void {}
    public function PreUnexpected(IpAddressContext $ctx): void {}
}
