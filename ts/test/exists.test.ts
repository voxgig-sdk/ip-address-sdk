
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IpAddressSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = IpAddressSDK.test()
    equal(testsdk instanceof IpAddressSDK, true,
      'IpAddressSDK.test() must return a client synchronously')
  })

})
