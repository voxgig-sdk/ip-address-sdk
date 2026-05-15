# IpAddress SDK utility: make_context

from core.context import IpAddressContext


def make_context_util(ctxmap, basectx):
    return IpAddressContext(ctxmap, basectx)
