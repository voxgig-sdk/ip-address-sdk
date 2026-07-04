# Typed models for the IpAddress SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class BulkQueryIP:
    ip: Optional[str] = None
    isp: Optional[str] = None
    location: Optional[dict] = None
    risk: Optional[dict] = None


@dataclass
class BulkQueryIPListMatch:
    id: str


@dataclass
class GetCurrentIp:
    pass


@dataclass
class GetCurrentIpLoadMatch:
    pass


@dataclass
class GetIpIntelligence:
    ip: Optional[str] = None
    isp: Optional[str] = None
    location: Optional[dict] = None
    risk: Optional[dict] = None


@dataclass
class GetIpIntelligenceLoadMatch:
    id: str

