-- BulkQueryIP entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("ip-address_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("BulkQueryIPEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:BulkQueryIP(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = bulk_query_i_p_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "bulk_query_i_p." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set IPADDRESS_TEST_BULK_QUERY_I_P_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local bulk_query_i_p_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.bulk_query_i_p")))
    local bulk_query_i_p_ref01_data = nil
    if #bulk_query_i_p_ref01_data_raw > 0 then
      bulk_query_i_p_ref01_data = helpers.to_map(bulk_query_i_p_ref01_data_raw[1][2])
    end

    -- LIST
    local bulk_query_i_p_ref01_ent = client:BulkQueryIP(nil)
    local bulk_query_i_p_ref01_match = {
      ["ips"] = setup.idmap["ips01"],
    }

    local bulk_query_i_p_ref01_list_result, err = bulk_query_i_p_ref01_ent:list(bulk_query_i_p_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(bulk_query_i_p_ref01_list_result)

  end)
end)

function bulk_query_i_p_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/bulk_query_i_p/BulkQueryIPTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read bulk_query_i_p test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "bulk_query_i_p01", "bulk_query_i_p02", "bulk_query_i_p03", "ips01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("IPADDRESS_TEST_BULK_QUERY_I_P_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["IPADDRESS_TEST_BULK_QUERY_I_P_ENTID"] = idmap,
    ["IPADDRESS_TEST_LIVE"] = "FALSE",
    ["IPADDRESS_TEST_EXPLAIN"] = "FALSE",
    ["IPADDRESS_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["IPADDRESS_TEST_BULK_QUERY_I_P_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["IPADDRESS_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["IPADDRESS_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["IPADDRESS_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["IPADDRESS_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
