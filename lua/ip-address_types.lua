-- Typed models for the IpAddress SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class BulkQueryIP
---@field ip? string
---@field isp? string
---@field location? table
---@field risk? table

---@class BulkQueryIPListMatch
---@field id string

---@class GetCurrentIp

---@class GetCurrentIpLoadMatch

---@class GetIpIntelligence
---@field ip? string
---@field isp? string
---@field location? table
---@field risk? table

---@class GetIpIntelligenceLoadMatch
---@field id string

local M = {}

return M
