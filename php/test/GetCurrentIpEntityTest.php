<?php
declare(strict_types=1);

// GetCurrentIp entity test

require_once __DIR__ . '/../ipaddress_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class GetCurrentIpEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = IpAddressSDK::test(null, null);
        $ent = $testsdk->GetCurrentIp(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = get_current_ip_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "get_current_ip." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set IPADDRESS_TEST_GET_CURRENT_IP_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $get_current_ip_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.get_current_ip")));
        $get_current_ip_ref01_data = null;
        if (count($get_current_ip_ref01_data_raw) > 0) {
            $get_current_ip_ref01_data = Helpers::to_map($get_current_ip_ref01_data_raw[0][1]);
        }

        // LOAD
        $get_current_ip_ref01_ent = $client->GetCurrentIp(null);
        $get_current_ip_ref01_match_dt0 = [];
        [$get_current_ip_ref01_data_dt0_loaded, $err] = $get_current_ip_ref01_ent->load($get_current_ip_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($get_current_ip_ref01_data_dt0_loaded);

    }
}

function get_current_ip_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/get_current_ip/GetCurrentIpTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = IpAddressSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["get_current_ip01", "get_current_ip02", "get_current_ip03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("IPADDRESS_TEST_GET_CURRENT_IP_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "IPADDRESS_TEST_GET_CURRENT_IP_ENTID" => $idmap,
        "IPADDRESS_TEST_LIVE" => "FALSE",
        "IPADDRESS_TEST_EXPLAIN" => "FALSE",
        "IPADDRESS_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["IPADDRESS_TEST_GET_CURRENT_IP_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["IPADDRESS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["IPADDRESS_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new IpAddressSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["IPADDRESS_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["IPADDRESS_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
