package = "voxgig-sdk-ip-address"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/ip-address-sdk.git"
}
description = {
  summary = "IpAddress SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["ip-address_sdk"] = "ip-address_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
