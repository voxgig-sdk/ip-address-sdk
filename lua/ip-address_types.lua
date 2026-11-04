-- Typed models for the IpAddress SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class BulkQueryIp
---@field ip? string
---@field isp? string
---@field location? table
---@field risk? table

---@class BulkQueryIpListMatch
---@field ips string
---@field format? string

---@class CurrentIp

---@class CurrentIpLoadMatch
---@field format? string

---@class IpIntelligence
---@field ip? string
---@field isp? string
---@field location? table
---@field risk? table

---@class IpIntelligenceLoadMatch
---@field id string
---@field format? string

local M = {}

return M
