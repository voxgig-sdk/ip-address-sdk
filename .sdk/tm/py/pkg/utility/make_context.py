# IpAddress SDK utility: make_context

from projectname_sdk.core.context import IpAddressContext


def make_context_util(ctxmap, basectx):
    return IpAddressContext(ctxmap, basectx)
