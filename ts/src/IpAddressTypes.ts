// Typed models for the IpAddress SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface BulkQueryIp {
  ip?: string
  isp?: string
  location?: Record<string, any>
  risk?: Record<string, any>
}

export interface BulkQueryIpListMatch {
  ips: string
  format?: string
}

export interface CurrentIp {
}

export interface CurrentIpLoadMatch {
  format?: string
}

export interface IpIntelligence {
  ip?: string
  isp?: string
  location?: Record<string, any>
  risk?: Record<string, any>
}

export interface IpIntelligenceLoadMatch {
  id: string
  format?: string
}

