

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { IpAddressSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('BulkQueryIpEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IP_ADDRESS_TEST_LIVE=TRUE.
  afterEach(liveDelay('IP_ADDRESS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpAddressSDK.test()
    const ent = testsdk.BulkQueryIp()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = IpAddressSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BulkQueryIp().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IP_ADDRESS_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'bulk_query_ip.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"ip":{"a":true,"h":"Ip","n":"ip","r":false,"sh":"The queried IP address","t":"`$STRING`","key$":"ip","index$":1},"isp":{"a":true,"h":"Isp","n":"isp","r":false,"sh":"Internet Service Provider name","t":"`$STRING`","key$":"isp","index$":2},"location":{"a":true,"h":"Location","n":"location","r":false,"sh":"Location information for the IP address","t":"`$OBJECT`","key$":"location","index$":3},"risk":{"a":true,"h":"Risk","n":"risk","r":false,"sh":"Risk assessment data for the IP address","t":"`$OBJECT`","key$":"risk","index$":4}},"id":{"field":"id","name":"id"},"name":"bulk_query_ip","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /{ips}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"1.1.1.1,8.8.8.8,9.9.9.9","k":"param","n":"id","or":"ips","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/{ips}","q":{"exist":["id"]},"r":{"param":{"ips":"id"}},"rs":{"alternatives":[{"kind":"raw","media":"application/xml"},{"binary":true,"kind":"raw","media":"application/yaml"}],"kind":"json","media":"application/json"},"s":[{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"bulk_query_ip","name__orig":"bulk_query_ip","Name":"BulkQueryIp","name_":"bulk_query_ip","name-":"bulk-query-ip","NAME":"BULK_QUERY_IP","index$":0}, {"active":true,"entity":"bulk_query_ip","key$":"BasicBulkQueryIpFlow","kind":"basic","name":"BasicBulkQueryIpFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{"ips":"ips01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"bulk_query_ip_ref01"}}],"unreachable":true}]}, 'BulkQueryIp', {"GET /{ips}":{"protocol":"http","parameters":[{"name":"ips","in":"path","description":"Comma-separated list of IP addresses (max 10,000)","required":true,"schema":{"type":"string","example":"1.1.1.1,8.8.8.8,9.9.9.9"},"index$":0},{"name":"format","in":"query","description":"Response format","required":false,"schema":{"type":"string","enum":["json","xml","yaml","text"],"default":"json"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let bulk_query_ip_ref01_data = Object.values(setup.data.existing.bulk_query_ip)[0] as any

  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/bulk_query_ip/BulkQueryIpTestData.json')

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
    ['bulk_query_ip01','bulk_query_ip02','bulk_query_ip03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IP_ADDRESS_TEST_BULK_QUERY_IP_ENTID': idmap,
    'IP_ADDRESS_TEST_LIVE': 'FALSE',
    'IP_ADDRESS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IP_ADDRESS_TEST_BULK_QUERY_IP_ENTID']

  const live = 'TRUE' === env.IP_ADDRESS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IP_ADDRESS_TEST_BULK_QUERY_IP_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new IpAddressSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
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
    transport,
    now: Date.now(),
  }

  return setup
}
  
