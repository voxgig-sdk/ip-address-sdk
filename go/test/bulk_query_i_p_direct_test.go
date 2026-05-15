package sdktest

import (
	"encoding/json"
	"os"
	"strings"
	"testing"

	sdk "github.com/voxgig-sdk/ip-address-sdk"
	"github.com/voxgig-sdk/ip-address-sdk/core"
)

func TestBulkQueryIPDirect(t *testing.T) {
	t.Run("direct-list-bulk_query_i_p", func(t *testing.T) {
		setup := bulk_query_i_pDirectSetup([]any{
			map[string]any{"id": "direct01"},
			map[string]any{"id": "direct02"},
		})
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		if _shouldSkip, _reason := isControlSkipped("direct", "direct-list-bulk_query_i_p", _mode); _shouldSkip {
			if _reason == "" {
				_reason = "skipped via sdk-test-control.json"
			}
			t.Skip(_reason)
			return
		}
		if setup.live {
			for _, _liveKey := range []string{"bulk_query_i_p01"} {
				if v := setup.idmap[_liveKey]; v == nil {
					t.Skipf("live test needs %s via *_ENTID env var (synthetic IDs only)", _liveKey)
					return
				}
			}
		}
		client := setup.client

		params := map[string]any{}
		if setup.live {
			params["id"] = setup.idmap["bulk_query_i_p01"]
		} else {
			params["id"] = "direct01"
		}

		result, err := client.Direct(map[string]any{
			"path":   "{id}",
			"method": "GET",
			"params": params,
		})
		if setup.live {
			// Live mode is lenient: synthetic IDs frequently 4xx and the
			// list-response shape varies wildly across public APIs. Skip
			// rather than fail when the call doesn't return a usable list.
			if err != nil {
				t.Skipf("list call failed (likely synthetic IDs against live API): %v", err)
			}
			if result["ok"] != true {
				t.Skipf("list call not ok (likely synthetic IDs against live API): %v", result)
			}
			status := core.ToInt(result["status"])
			if status < 200 || status >= 300 {
				t.Skipf("expected 2xx status, got %v", result["status"])
			}
		} else {
			if err != nil {
				t.Fatalf("direct failed: %v", err)
			}
			if result["ok"] != true {
				t.Fatalf("expected ok to be true, got %v", result["ok"])
			}
			if core.ToInt(result["status"]) != 200 {
				t.Fatalf("expected status 200, got %v", result["status"])
			}
		}

		if !setup.live {
			if dataList, ok := result["data"].([]any); ok {
				if len(dataList) != 2 {
					t.Fatalf("expected 2 items, got %d", len(dataList))
				}
			} else {
				t.Fatalf("expected data to be an array, got %T", result["data"])
			}

			if len(*setup.calls) != 1 {
				t.Fatalf("expected 1 call, got %d", len(*setup.calls))
			}
			call := (*setup.calls)[0]
			if initMap, ok := call["init"].(map[string]any); ok {
				if initMap["method"] != "GET" {
					t.Fatalf("expected method GET, got %v", initMap["method"])
				}
			}
			if url, ok := call["url"].(string); ok {
				if !strings.Contains(url, "direct01") {
					t.Fatalf("expected url to contain direct01, got %v", url)
				}
			}
		}
	})

}

type bulk_query_i_pDirectSetupResult struct {
	client *sdk.IpAddressSDK
	calls  *[]map[string]any
	live   bool
	idmap  map[string]any
}

func bulk_query_i_pDirectSetup(mockres any) *bulk_query_i_pDirectSetupResult {
	loadEnvLocal()

	calls := &[]map[string]any{}

	env := envOverride(map[string]any{
		"IPADDRESS_TEST_BULK_QUERY_I_P_ENTID": map[string]any{},
		"IPADDRESS_TEST_LIVE":    "FALSE",
		"IPADDRESS_APIKEY":       "NONE",
	})

	live := env["IPADDRESS_TEST_LIVE"] == "TRUE"

	if live {
		mergedOpts := map[string]any{
			"apikey": env["IPADDRESS_APIKEY"],
		}
		client := sdk.NewIpAddressSDK(mergedOpts)

		idmap := map[string]any{}
		if entidRaw, ok := env["IPADDRESS_TEST_BULK_QUERY_I_P_ENTID"]; ok {
			if entidStr, ok := entidRaw.(string); ok && strings.HasPrefix(entidStr, "{") {
				json.Unmarshal([]byte(entidStr), &idmap)
			} else if entidMap, ok := entidRaw.(map[string]any); ok {
				idmap = entidMap
			}
		}

		return &bulk_query_i_pDirectSetupResult{client: client, calls: calls, live: true, idmap: idmap}
	}

	mockFetch := func(url string, init map[string]any) (map[string]any, error) {
		*calls = append(*calls, map[string]any{"url": url, "init": init})
		return map[string]any{
			"status":     200,
			"statusText": "OK",
			"headers":    map[string]any{},
			"json": (func() any)(func() any {
				if mockres != nil {
					return mockres
				}
				return map[string]any{"id": "direct01"}
			}),
		}, nil
	}

	client := sdk.NewIpAddressSDK(map[string]any{
		"base": "http://localhost:8080",
		"system": map[string]any{
			"fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
		},
	})

	return &bulk_query_i_pDirectSetupResult{client: client, calls: calls, live: false, idmap: map[string]any{}}
}

var _ = os.Getenv
var _ = json.Unmarshal
