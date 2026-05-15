# IpAddress SDK exists test

require "minitest/autorun"
require_relative "../IpAddress_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = IpAddressSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
