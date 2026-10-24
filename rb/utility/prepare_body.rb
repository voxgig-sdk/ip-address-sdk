# IpAddress SDK utility: prepare_body
require_relative 'media'
module IpAddressUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return IpAddressUtilities.raw_body(ctx.reqdata) if IpAddressUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
