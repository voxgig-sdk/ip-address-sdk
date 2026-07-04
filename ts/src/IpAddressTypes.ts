// Typed models for the IpAddress SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface BulkQueryIP {
  ip?: string
  isp?: string
  location?: Record<string, any>
  risk?: Record<string, any>
}

export interface BulkQueryIPListMatch {
  id: string
}

export interface GetCurrentIp {
}

export type GetCurrentIpLoadMatch = Partial<GetCurrentIp>

export interface GetIpIntelligence {
  ip?: string
  isp?: string
  location?: Record<string, any>
  risk?: Record<string, any>
}

export interface GetIpIntelligenceLoadMatch {
  id: string
}

