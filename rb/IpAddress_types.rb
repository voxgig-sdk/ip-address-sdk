# frozen_string_literal: true

# Typed models for the IpAddress SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# BulkQueryIp entity data model.
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
BulkQueryIp = Struct.new(
  :ip,
  :isp,
  :location,
  :risk,
  keyword_init: true
)

# Request payload for BulkQueryIp#list.
#
# @!attribute [rw] ips
#   @return [String]
#
# @!attribute [rw] format
#   @return [String, nil]
BulkQueryIpListMatch = Struct.new(
  :ips,
  :format,
  keyword_init: true
)

# CurrentIp entity data model.
class CurrentIp
end

# Request payload for CurrentIp#load.
#
# @!attribute [rw] format
#   @return [String, nil]
CurrentIpLoadMatch = Struct.new(
  :format,
  keyword_init: true
)

# IpIntelligence entity data model.
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
IpIntelligence = Struct.new(
  :ip,
  :isp,
  :location,
  :risk,
  keyword_init: true
)

# Request payload for IpIntelligence#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] format
#   @return [String, nil]
IpIntelligenceLoadMatch = Struct.new(
  :id,
  :format,
  keyword_init: true
)

