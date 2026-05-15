# IpAddress SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module IpAddressFeatures
  def self.make_feature(name)
    case name
    when "base"
      IpAddressBaseFeature.new
    when "test"
      IpAddressTestFeature.new
    else
      IpAddressBaseFeature.new
    end
  end
end
