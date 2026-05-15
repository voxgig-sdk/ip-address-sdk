# IpAddress SDK utility: make_context
require_relative '../core/context'
module IpAddressUtilities
  MakeContext = ->(ctxmap, basectx) {
    IpAddressContext.new(ctxmap, basectx)
  }
end
