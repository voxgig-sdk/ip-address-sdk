-- IpAddress SDK error

local IpAddressError = {}
IpAddressError.__index = IpAddressError


function IpAddressError.new(code, msg, ctx)
  local self = setmetatable({}, IpAddressError)
  self.is_sdk_error = true
  self.sdk = "IpAddress"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function IpAddressError:error()
  return self.msg
end


function IpAddressError:__tostring()
  return self.msg
end


return IpAddressError
