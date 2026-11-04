# Typed models for the IpAddress SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class BulkQueryIp(TypedDict, total=False):
    ip: str
    isp: str
    location: dict
    risk: dict


class BulkQueryIpListMatchRequired(TypedDict):
    ips: str


class BulkQueryIpListMatch(BulkQueryIpListMatchRequired, total=False):
    format: str


class CurrentIp(TypedDict):
    pass


class CurrentIpLoadMatch(TypedDict, total=False):
    format: str


class IpIntelligence(TypedDict, total=False):
    ip: str
    isp: str
    location: dict
    risk: dict


class IpIntelligenceLoadMatchRequired(TypedDict):
    id: str


class IpIntelligenceLoadMatch(IpIntelligenceLoadMatchRequired, total=False):
    format: str
