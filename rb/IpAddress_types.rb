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
# @!attribute [rw] id
#   @return [String, nil]
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
  :id,
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
#
# @!attribute [rw] format
#   @return [String, nil]
BulkQueryIPListMatch = Struct.new(
  :id,
  :format,
  keyword_init: true
)

# GetCurrentIp entity data model.
class GetCurrentIp
end

# Request payload for GetCurrentIp#load.
#
# @!attribute [rw] format
#   @return [String, nil]
GetCurrentIpLoadMatch = Struct.new(
  :format,
  keyword_init: true
)

# GetIpIntelligence entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
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
  :id,
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
#
# @!attribute [rw] format
#   @return [String, nil]
GetIpIntelligenceLoadMatch = Struct.new(
  :id,
  :format,
  keyword_init: true
)

