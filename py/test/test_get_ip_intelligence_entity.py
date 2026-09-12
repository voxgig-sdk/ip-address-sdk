# GetIpIntelligence entity test

import json
import os
import time

import pytest

from ipaddress_sdk.utility.voxgig_struct import voxgig_struct as vs
from ipaddress_sdk import IpAddressSDK
from ipaddress_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestGetIpIntelligenceEntity:

    def test_should_create_instance(self):
        testsdk = IpAddressSDK.test(None, None)
        ent = testsdk.GetIpIntelligence(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _get_ip_intelligence_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "get_ip_intelligence." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set IP_ADDRESS_TEST_GET_IP_INTELLIGENCE_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        get_ip_intelligence_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.get_ip_intelligence")))
        get_ip_intelligence_ref01_data = None
        if len(get_ip_intelligence_ref01_data_raw) > 0:
            get_ip_intelligence_ref01_data = helpers.to_map(get_ip_intelligence_ref01_data_raw[0][1])

        # LOAD
        get_ip_intelligence_ref01_ent = client.GetIpIntelligence(None)
        get_ip_intelligence_ref01_match_dt0 = {
            "id": get_ip_intelligence_ref01_data["id"],
        }
        get_ip_intelligence_ref01_data_dt0_loaded = get_ip_intelligence_ref01_ent.load(get_ip_intelligence_ref01_match_dt0, None)
        get_ip_intelligence_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(get_ip_intelligence_ref01_data_dt0_loaded))
        assert get_ip_intelligence_ref01_data_dt0_load_result is not None
        assert get_ip_intelligence_ref01_data_dt0_load_result["id"] == get_ip_intelligence_ref01_data["id"]



def _get_ip_intelligence_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/get_ip_intelligence/GetIpIntelligenceTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = IpAddressSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["get_ip_intelligence01", "get_ip_intelligence02", "get_ip_intelligence03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "IP_ADDRESS_TEST_GET_IP_INTELLIGENCE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "IP_ADDRESS_TEST_GET_IP_INTELLIGENCE_ENTID": idmap,
        "IP_ADDRESS_TEST_LIVE": "FALSE",
        "IP_ADDRESS_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("IP_ADDRESS_TEST_GET_IP_INTELLIGENCE_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("IP_ADDRESS_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
            },
            extra or {},
        ])
        client = IpAddressSDK(helpers.to_map(merged_opts))

    _live = env.get("IP_ADDRESS_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("IP_ADDRESS_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
