-- IpIntelligence entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("ip-address_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("IpIntelligenceEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:IpIntelligence(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:IpIntelligence(nil):load({ ["id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = ip_intelligence_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "ip_intelligence." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live then
      for _live_key, _live_ex in pairs({["ip_intelligence01"] = "1.1.1.1"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          setup.idmap[_live_key] = _live_ex
        end
      end
    end
    local client = setup.client
    if setup.live then
      runner.live_existing(pending, setup, LIVE_STRICT, "ip_intelligence", function()
        return { { id = setup.idmap["ip_intelligence01"] } }
      end, "ip", setup.idmap["ip_intelligence01"])
    end

    -- Bootstrap entity data from existing test data.
    local ip_intelligence_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.ip_intelligence")))
    local ip_intelligence_ref01_data = nil
    if #ip_intelligence_ref01_data_raw > 0 then
      ip_intelligence_ref01_data = helpers.to_map(ip_intelligence_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local ip_intelligence_ref01_ent = client:IpIntelligence(nil)
    local ip_intelligence_ref01_match_dt0 = {
      id = ip_intelligence_ref01_data["ip"],
    }
    local ip_intelligence_ref01_data_dt0_loaded, err = ip_intelligence_ref01_ent:load(ip_intelligence_ref01_match_dt0, nil)
    assert.is_nil(err)
    local ip_intelligence_ref01_data_dt0_load_result = helpers.to_map(type(ip_intelligence_ref01_data_dt0_loaded) == 'table' and ip_intelligence_ref01_data_dt0_loaded.data_get and ip_intelligence_ref01_data_dt0_loaded:data_get() or ip_intelligence_ref01_data_dt0_loaded)
    assert.is_not_nil(ip_intelligence_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(ip_intelligence_ref01_data_dt0_load_result["ip"], ip_intelligence_ref01_data["ip"]))

  end)
end)

function ip_intelligence_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/ip_intelligence/IpIntelligenceTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read ip_intelligence test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  for _, rec in pairs(((entity_data["existing"] or {})["ip_intelligence"]) or {}) do
    if type(rec) == "table" and rec["id"] ~= nil then
      rec["ip"] = rec["id"]
    end
  end

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "ip_intelligence01", "ip_intelligence02", "ip_intelligence03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("IP_ADDRESS_TEST_IP_INTELLIGENCE_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["IP_ADDRESS_TEST_IP_INTELLIGENCE_ENTID"] = idmap,
    ["IP_ADDRESS_TEST_LIVE"] = "FALSE",
    ["IP_ADDRESS_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["IP_ADDRESS_TEST_IP_INTELLIGENCE_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["IP_ADDRESS_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["IP_ADDRESS_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["IP_ADDRESS_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
