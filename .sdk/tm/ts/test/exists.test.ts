
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IpAddressSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await IpAddressSDK.test()
    equal(null !== testsdk, true)
  })

})
