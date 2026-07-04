# frozen_string_literal: true

# Typed models for the IpAddress SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# BulkQueryIP entity data model.
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] isp
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
#
# @!attribute [rw] risk
#   @return [Hash, nil]
BulkQueryIP = Struct.new(
  :ip,
  :isp,
  :location,
  :risk,
  keyword_init: true
)

# Request payload for BulkQueryIP#list.
#
# @!attribute [rw] id
#   @return [String]
BulkQueryIPListMatch = Struct.new(
  :id,
  keyword_init: true
)

# GetCurrentIp entity data model.
class GetCurrentIp
end

# Match filter for GetCurrentIp#load (any subset of GetCurrentIp fields).
class GetCurrentIpLoadMatch
end

# GetIpIntelligence entity data model.
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] isp
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
#
# @!attribute [rw] risk
#   @return [Hash, nil]
GetIpIntelligence = Struct.new(
  :ip,
  :isp,
  :location,
  :risk,
  keyword_init: true
)

# Request payload for GetIpIntelligence#load.
#
# @!attribute [rw] id
#   @return [String]
GetIpIntelligenceLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

