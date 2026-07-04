// Typed models for the IpAddress SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// BulkQueryIP is the typed data model for the bulk_query_i_p entity.
type BulkQueryIP struct {
	Ip *string `json:"ip,omitempty"`
	Isp *string `json:"isp,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
	Risk *map[string]any `json:"risk,omitempty"`
}

// BulkQueryIPListMatch is the typed request payload for BulkQueryIP.ListTyped.
type BulkQueryIPListMatch struct {
	Id string `json:"id"`
}

// GetCurrentIp is the typed data model for the get_current_ip entity.
type GetCurrentIp struct {
}

// GetCurrentIpLoadMatch mirrors the get_current_ip fields as an all-optional match
// filter (Go analog of Partial<GetCurrentIp>).
type GetCurrentIpLoadMatch struct {
}

// GetIpIntelligence is the typed data model for the get_ip_intelligence entity.
type GetIpIntelligence struct {
	Ip *string `json:"ip,omitempty"`
	Isp *string `json:"isp,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
	Risk *map[string]any `json:"risk,omitempty"`
}

// GetIpIntelligenceLoadMatch is the typed request payload for GetIpIntelligence.LoadTyped.
type GetIpIntelligenceLoadMatch struct {
	Id string `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
