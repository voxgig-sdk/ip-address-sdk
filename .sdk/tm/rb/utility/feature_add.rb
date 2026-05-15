# IpAddress SDK utility: feature_add
module IpAddressUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
