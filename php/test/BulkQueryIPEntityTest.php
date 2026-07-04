<?php
declare(strict_types=1);

// BulkQueryIP entity test

require_once __DIR__ . '/../ipaddress_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class BulkQueryIPEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = IpAddressSDK::test(null, null);
        $ent = $testsdk->BulkQueryIP(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = bulk_query_i_p_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "bulk_query_i_p." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set IPADDRESS_TEST_BULK_QUERY_I_P_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $bulk_query_i_p_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.bulk_query_i_p")));
        $bulk_query_i_p_ref01_data = null;
        if (count($bulk_query_i_p_ref01_data_raw) > 0) {
            $bulk_query_i_p_ref01_data = Helpers::to_map($bulk_query_i_p_ref01_data_raw[0][1]);
        }

        // LIST
        $bulk_query_i_p_ref01_ent = $client->BulkQueryIP(null);
        $bulk_query_i_p_ref01_match = [
            "ips" => $setup["idmap"]["ips01"],
        ];

        $bulk_query_i_p_ref01_list_result = $bulk_query_i_p_ref01_ent->list($bulk_query_i_p_ref01_match, null);
        $this->assertIsArray($bulk_query_i_p_ref01_list_result);

    }
}

function bulk_query_i_p_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/bulk_query_i_p/BulkQueryIPTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = IpAddressSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["bulk_query_i_p01", "bulk_query_i_p02", "bulk_query_i_p03", "ips01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("IPADDRESS_TEST_BULK_QUERY_I_P_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "IPADDRESS_TEST_BULK_QUERY_I_P_ENTID" => $idmap,
        "IPADDRESS_TEST_LIVE" => "FALSE",
        "IPADDRESS_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["IPADDRESS_TEST_BULK_QUERY_I_P_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["IPADDRESS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
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
