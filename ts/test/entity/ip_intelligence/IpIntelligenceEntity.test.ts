

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


describe('IpIntelligenceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IP_ADDRESS_TEST_LIVE=TRUE.
  afterEach(liveDelay('IP_ADDRESS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpAddressSDK.test()
    const ent = testsdk.IpIntelligence()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = IpAddressSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.IpIntelligence().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IP_ADDRESS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ip_intelligence.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ip":{"a":true,"h":"Ip","n":"ip","r":false,"sh":"The queried IP address","t":"`$STRING`","key$":"ip","index$":0},"isp":{"a":true,"h":"Isp","n":"isp","r":false,"sh":"Internet Service Provider name","t":"`$STRING`","key$":"isp","index$":1},"location":{"a":true,"h":"Location","n":"location","r":false,"sh":"Location information for the IP address","t":"`$OBJECT`","key$":"location","index$":2},"risk":{"a":true,"h":"Risk","n":"risk","r":false,"sh":"Risk assessment data for the IP address","t":"`$OBJECT`","key$":"risk","index$":3}},"id":{"field":"ip","name":"id"},"name":"ip_intelligence","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /{ip}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"1.1.1.1","k":"param","n":"id","or":"ip","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/{ip}","q":{"exist":["id"]},"r":{"param":{"ip":"id"}},"rs":{"alternatives":[{"kind":"raw","media":"application/xml"},{"binary":true,"kind":"raw","media":"application/yaml"}],"kind":"json","media":"application/json"},"s":[{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"ip_intelligence","name__orig":"ip_intelligence","Name":"IpIntelligence","name_":"ip_intelligence","name-":"ip-intelligence","NAME":"IP_INTELLIGENCE","index$":2}, {"active":true,"entity":"ip_intelligence","key$":"BasicIpIntelligenceFlow","kind":"basic","name":"BasicIpIntelligenceFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"ip_intelligence_ref01","srcdatavar":"ip_intelligence_ref01_data","suffix":"_dt0"},"m":{"id":"ip_intelligence01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-ip_intelligence_ref01"}}],"index$":0,"route":"GET /{ip}","record":{}}]}, 'IpIntelligence', {"GET /{ip}":{"protocol":"http","parameters":[{"name":"ip","in":"path","description":"IP address to query","required":true,"schema":{"type":"string","example":"1.1.1.1"},"index$":0},{"name":"format","in":"query","description":"Response format","required":false,"schema":{"type":"string","enum":["json","xml","yaml","text"],"default":"json"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let ip_intelligence_ref01_data = Object.values(setup.data.existing.ip_intelligence)[0] as any

    // LOAD
    const ip_intelligence_ref01_ent = client.IpIntelligence()
    const ip_intelligence_ref01_match_dt0: any = {}
    ip_intelligence_ref01_match_dt0.id = ip_intelligence_ref01_data.ip
    const ip_intelligence_ref01_data_dt0 = (await ip_intelligence_ref01_ent.load(ip_intelligence_ref01_match_dt0)).data()
    assert(ip_intelligence_ref01_data_dt0.ip === ip_intelligence_ref01_data.ip)


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
      '../../../../.sdk/test/entity/ip_intelligence/IpIntelligenceTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  for (const rec of Object.values(entityData.existing?.["ip_intelligence"] ?? {}) as any[]) {
    if (null != rec?.id) rec.ip = rec.id
  }

  options.entity = entityData.existing

  let client = IpAddressSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['ip_intelligence01','ip_intelligence02','ip_intelligence03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IP_ADDRESS_TEST_IP_INTELLIGENCE_ENTID': idmap,
    'IP_ADDRESS_TEST_LIVE': 'FALSE',
    'IP_ADDRESS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IP_ADDRESS_TEST_IP_INTELLIGENCE_ENTID']

  const live = 'TRUE' === env.IP_ADDRESS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IP_ADDRESS_TEST_IP_INTELLIGENCE_ENTID']
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
  
