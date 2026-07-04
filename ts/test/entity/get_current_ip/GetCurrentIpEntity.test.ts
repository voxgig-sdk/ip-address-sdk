
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { IpAddressSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('GetCurrentIpEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IPADDRESS_TEST_LIVE=TRUE.
  afterEach(liveDelay('IPADDRESS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpAddressSDK.test()
    const ent = testsdk.GetCurrentIp()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IP_ADDRESS_TEST_LIVE
    for (const op of ['load']) {
      if (maybeSkipControl(t, 'entityOp', 'get_current_ip.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set IP_ADDRESS_TEST_GET_CURRENT_IP_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_current_ip_ref01_data = Object.values(setup.data.existing.get_current_ip)[0] as any

    // LOAD
    const get_current_ip_ref01_ent = client.GetCurrentIp()
    const get_current_ip_ref01_match_dt0: any = {}
    const get_current_ip_ref01_data_dt0 = await get_current_ip_ref01_ent.load(get_current_ip_ref01_match_dt0)
    assert(null != get_current_ip_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_current_ip/GetCurrentIpTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = IpAddressSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['get_current_ip01','get_current_ip02','get_current_ip03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['IP_ADDRESS_TEST_GET_CURRENT_IP_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'IP_ADDRESS_TEST_GET_CURRENT_IP_ENTID': idmap,
    'IP_ADDRESS_TEST_LIVE': 'FALSE',
    'IP_ADDRESS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IP_ADDRESS_TEST_GET_CURRENT_IP_ENTID']

  const live = 'TRUE' === env.IP_ADDRESS_TEST_LIVE

  if (live) {
    client = new IpAddressSDK(merge([
      {
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.IP_ADDRESS_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
