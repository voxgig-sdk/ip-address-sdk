# IpAddress SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module IpAddressFeatures
  def self.make_feature(name)
    case name
    when "base"
      IpAddressBaseFeature.new
    when "ratelimit"
      IpAddressRatelimitFeature.new
    when "retry"
      IpAddressRetryFeature.new
    when "test"
      IpAddressTestFeature.new
    when "timeout"
      IpAddressTimeoutFeature.new
    else
      IpAddressBaseFeature.new
    end
  end
end
