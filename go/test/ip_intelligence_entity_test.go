package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/ip-address-sdk/go"
	"github.com/voxgig-sdk/ip-address-sdk/go/core"

	vs "github.com/voxgig-sdk/ip-address-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const ip_intelligenceEntityLiveStrict = true


func TestIpIntelligenceEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.IpIntelligence(nil)
		if ent == nil {
			t.Fatal("expected non-nil IpIntelligenceEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.IpIntelligence(nil).Load(map[string]any{"id": 1}, nil)
		if sdkerr, ok := err.(*core.IpAddressError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := ip_intelligenceBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "ip_intelligence." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _liveKey, _liveEx := range map[string]any{"ip_intelligence01": "1.1.1.1"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					setup.idmap[_liveKey] = _liveEx
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, ip_intelligenceEntityLiveStrict, setup.data, "ip_intelligence", "ip", setup.idmap["ip_intelligence01"],
				func() (any, error) {
					return []any{map[string]any{"id": setup.idmap["ip_intelligence01"]}}, nil
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		ipIntelligenceRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.ip_intelligence")))
		var ipIntelligenceRef01Data map[string]any
		if len(ipIntelligenceRef01DataRaw) > 0 {
			ipIntelligenceRef01Data = core.ToMapAny(ipIntelligenceRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = ipIntelligenceRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		ipIntelligenceRef01Ent := client.IpIntelligence(nil)
		ipIntelligenceRef01MatchDt0 := map[string]any{
			"id": ipIntelligenceRef01Data["ip"],
		}
		ipIntelligenceRef01DataDt0Loaded, err := ipIntelligenceRef01Ent.Load(ipIntelligenceRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		ipIntelligenceRef01DataDt0LoadResult := core.ToMapAny(entityData(ipIntelligenceRef01DataDt0Loaded))
		if ipIntelligenceRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(ipIntelligenceRef01DataDt0LoadResult["ip"], ipIntelligenceRef01Data["ip"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func ip_intelligenceBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "ip_intelligence", "IpIntelligenceTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read ip_intelligence test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse ip_intelligence test data: " + err.Error())
	}

	for _, rec := range core.ToMapAny(vs.GetPath(entityData, "existing.ip_intelligence")) {
		if recMap := core.ToMapAny(rec); recMap != nil && recMap["id"] != nil {
			recMap["ip"] = recMap["id"]
		}
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"ip_intelligence01", "ip_intelligence02", "ip_intelligence03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("IP_ADDRESS_TEST_IP_INTELLIGENCE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"IP_ADDRESS_TEST_IP_INTELLIGENCE_ENTID": idmap,
		"IP_ADDRESS_TEST_LIVE":      "FALSE",
		"IP_ADDRESS_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["IP_ADDRESS_TEST_IP_INTELLIGENCE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["IP_ADDRESS_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewIpAddressSDK(core.ToMapAny(mergedOpts))
	}

	live := env["IP_ADDRESS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["IP_ADDRESS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
