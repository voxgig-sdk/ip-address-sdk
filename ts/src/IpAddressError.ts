
import { Context } from './Context'


class IpAddressError extends Error {

  isIpAddressError = true

  sdk = 'IpAddress'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  IpAddressError
}

