-- ProjectName SDK exists test

local sdk = require("ip-address_sdk")

describe("IpAddressSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
