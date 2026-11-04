# IpIntelligence entity test

require "minitest/autorun"
require "json"
require_relative "../IpAddress_sdk"
require_relative "runner"

class IpIntelligenceEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = IpAddressSDK.test(nil, nil)
    ent = testsdk.IpIntelligence(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = IpAddressConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = IpAddressSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.IpIntelligence(nil).load({ "id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = ip_intelligence_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "ip_intelligence." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      { "ip_intelligence01" => "1.1.1.1" }.each do |_live_key, _live_ex|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          setup[:idmap][_live_key] = _live_ex
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      Runner.live_existing(setup, LIVE_STRICT, "ip_intelligence", "ip", setup[:idmap]["ip_intelligence01"]) do
        [{ "id" => setup[:idmap]["ip_intelligence01"] }]
      end
    end

    # Bootstrap entity data from existing test data.
    ip_intelligence_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.ip_intelligence")))
    ip_intelligence_ref01_data = nil
    if ip_intelligence_ref01_data_raw.length > 0
      ip_intelligence_ref01_data = Helpers.to_map(ip_intelligence_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LOAD
    ip_intelligence_ref01_ent = client.IpIntelligence(nil)
    ip_intelligence_ref01_match_dt0 = {
      "id" => ip_intelligence_ref01_data["ip"],
    }
    ip_intelligence_ref01_data_dt0_loaded = ip_intelligence_ref01_ent.load(ip_intelligence_ref01_match_dt0, nil)
    ip_intelligence_ref01_data_dt0_load_result = Helpers.to_map(ip_intelligence_ref01_data_dt0_loaded.respond_to?(:data_get) ? ip_intelligence_ref01_data_dt0_loaded.data_get : ip_intelligence_ref01_data_dt0_loaded)
    assert !ip_intelligence_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(ip_intelligence_ref01_data_dt0_load_result["ip"], ip_intelligence_ref01_data["ip"])

  end
end

def ip_intelligence_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "ip_intelligence", "IpIntelligenceTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  ((entity_data["existing"] || {})["ip_intelligence"] || {}).each_value do |rec|
    rec["ip"] = rec["id"] if rec.is_a?(Hash) && !rec["id"].nil?
  end

  options = {}
  options["entity"] = entity_data["existing"]

  client = IpAddressSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["ip_intelligence01", "ip_intelligence02", "ip_intelligence03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["IP_ADDRESS_TEST_IP_INTELLIGENCE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "IP_ADDRESS_TEST_IP_INTELLIGENCE_ENTID" => idmap,
    "IP_ADDRESS_TEST_LIVE" => "FALSE",
    "IP_ADDRESS_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["IP_ADDRESS_TEST_IP_INTELLIGENCE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["IP_ADDRESS_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = IpAddressSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["IP_ADDRESS_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["IP_ADDRESS_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
