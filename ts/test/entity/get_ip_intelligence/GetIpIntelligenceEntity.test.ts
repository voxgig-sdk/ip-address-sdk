

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { IpAddressSDK, BaseFeature, stdutil } from '../../..'

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetIpIntelligenceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IP_ADDRESS_TEST_LIVE=TRUE.
  afterEach(liveDelay('IP_ADDRESS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpAddressSDK.test()
    const ent = testsdk.GetIpIntelligence()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IP_ADDRESS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_ip_intelligence.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"ip","req":false,"short":"The queried IP address","type":"`$STRING`","index$":1},{"active":true,"name":"isp","req":false,"short":"Internet Service Provider name","type":"`$STRING`","index$":2},{"active":true,"name":"location","req":false,"short":"Location information for the IP address","type":"`$OBJECT`","index$":3},{"active":true,"name":"risk","req":false,"short":"Risk assessment data for the IP address","type":"`$OBJECT`","index$":4}],"id":{"field":"id","name":"id"},"name":"get_ip_intelligence","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"1.1.1.1","kind":"param","name":"id","orig":"ip","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"example":"json","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /{ip}","json":"{\"operationId\":\"getIPIntelligence\",\"parameters\":[{\"description\":\"IP address to query\",\"in\":\"path\",\"name\":\"ip\",\"required\":true,\"schema\":{\"example\":\"1.1.1.1\",\"type\":\"string\"}},{\"description\":\"Response format\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"xml\",\"yaml\",\"text\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"ip\":{\"description\":\"The queried IP address\",\"example\":\"1.1.1.1\",\"type\":\"string\"},\"isp\":{\"description\":\"Internet Service Provider name\",\"example\":\"Cloudflare, Inc.\",\"type\":\"string\"},\"location\":{\"description\":\"Location information for the IP address\",\"properties\":{\"city\":{\"description\":\"City name\",\"example\":\"Los Angeles\",\"type\":\"string\"},\"country\":{\"description\":\"Full name of the country\",\"example\":\"United States\",\"type\":\"string\"},\"country_code\":{\"description\":\"Two-letter ISO 3166-1 alpha-2 country code\",\"example\":\"US\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"example\":34.0522,\"format\":\"float\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"example\":-118.2437,\"format\":\"float\",\"type\":\"number\"},\"state\":{\"description\":\"Region or state name\",\"example\":\"California\",\"type\":\"string\"},\"timezone\":{\"description\":\"Timezone identifier\",\"example\":\"America/Los_Angeles\",\"type\":\"string\"},\"zipcode\":{\"description\":\"Postal code\",\"example\":\"90001\",\"type\":\"string\"}},\"type\":\"object\"},\"risk\":{\"description\":\"Risk assessment data for the IP address\",\"properties\":{\"is_mobile\":{\"description\":\"True if associated with cellular network\",\"example\":false,\"type\":\"boolean\"},\"is_proxy\":{\"description\":\"True if is a known public proxy\",\"example\":false,\"type\":\"boolean\"},\"is_tor\":{\"description\":\"True if is a known Tor exit node\",\"example\":false,\"type\":\"boolean\"},\"is_vpn\":{\"description\":\"True if belongs to a known VPN provider\",\"example\":false,\"type\":\"boolean\"},\"risk_score\":{\"description\":\"0-100 score indicating malicious activity likelihood\",\"example\":0,\"maximum\":100,\"minimum\":0,\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"properties\":{\"ip\":{\"description\":\"The queried IP address\",\"example\":\"1.1.1.1\",\"type\":\"string\"},\"isp\":{\"description\":\"Internet Service Provider name\",\"example\":\"Cloudflare, Inc.\",\"type\":\"string\"},\"location\":{\"description\":\"Location information for the IP address\",\"properties\":{\"city\":{\"description\":\"City name\",\"example\":\"Los Angeles\",\"type\":\"string\"},\"country\":{\"description\":\"Full name of the country\",\"example\":\"United States\",\"type\":\"string\"},\"country_code\":{\"description\":\"Two-letter ISO 3166-1 alpha-2 country code\",\"example\":\"US\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"example\":34.0522,\"format\":\"float\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"example\":-118.2437,\"format\":\"float\",\"type\":\"number\"},\"state\":{\"description\":\"Region or state name\",\"example\":\"California\",\"type\":\"string\"},\"timezone\":{\"description\":\"Timezone identifier\",\"example\":\"America/Los_Angeles\",\"type\":\"string\"},\"zipcode\":{\"description\":\"Postal code\",\"example\":\"90001\",\"type\":\"string\"}},\"type\":\"object\"},\"risk\":{\"description\":\"Risk assessment data for the IP address\",\"properties\":{\"is_mobile\":{\"description\":\"True if associated with cellular network\",\"example\":false,\"type\":\"boolean\"},\"is_proxy\":{\"description\":\"True if is a known public proxy\",\"example\":false,\"type\":\"boolean\"},\"is_tor\":{\"description\":\"True if is a known Tor exit node\",\"example\":false,\"type\":\"boolean\"},\"is_vpn\":{\"description\":\"True if belongs to a known VPN provider\",\"example\":false,\"type\":\"boolean\"},\"risk_score\":{\"description\":\"0-100 score indicating malicious activity likelihood\",\"example\":0,\"maximum\":100,\"minimum\":0,\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}},\"application/yaml\":{\"schema\":{\"properties\":{\"ip\":{\"description\":\"The queried IP address\",\"example\":\"1.1.1.1\",\"type\":\"string\"},\"isp\":{\"description\":\"Internet Service Provider name\",\"example\":\"Cloudflare, Inc.\",\"type\":\"string\"},\"location\":{\"description\":\"Location information for the IP address\",\"properties\":{\"city\":{\"description\":\"City name\",\"example\":\"Los Angeles\",\"type\":\"string\"},\"country\":{\"description\":\"Full name of the country\",\"example\":\"United States\",\"type\":\"string\"},\"country_code\":{\"description\":\"Two-letter ISO 3166-1 alpha-2 country code\",\"example\":\"US\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"example\":34.0522,\"format\":\"float\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"example\":-118.2437,\"format\":\"float\",\"type\":\"number\"},\"state\":{\"description\":\"Region or state name\",\"example\":\"California\",\"type\":\"string\"},\"timezone\":{\"description\":\"Timezone identifier\",\"example\":\"America/Los_Angeles\",\"type\":\"string\"},\"zipcode\":{\"description\":\"Postal code\",\"example\":\"90001\",\"type\":\"string\"}},\"type\":\"object\"},\"risk\":{\"description\":\"Risk assessment data for the IP address\",\"properties\":{\"is_mobile\":{\"description\":\"True if associated with cellular network\",\"example\":false,\"type\":\"boolean\"},\"is_proxy\":{\"description\":\"True if is a known public proxy\",\"example\":false,\"type\":\"boolean\"},\"is_tor\":{\"description\":\"True if is a known Tor exit node\",\"example\":false,\"type\":\"boolean\"},\"is_vpn\":{\"description\":\"True if belongs to a known VPN provider\",\"example\":false,\"type\":\"boolean\"},\"risk_score\":{\"description\":\"0-100 score indicating malicious activity likelihood\",\"example\":0,\"maximum\":100,\"minimum\":0,\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with IP intelligence data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad Request - Invalid IP format or query parameters\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Too Many Requests - You have exceeded the rate limit\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal Server Error - Something went wrong on our end\"}},\"security\":[],\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{ip}","rename":{"param":{"ip":"id"}},"segments":[{"var":"id"}],"select":{"exist":["format","id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_ip_intelligence","name__orig":"get_ip_intelligence","Name":"GetIpIntelligence","name_":"get_ip_intelligence","name-":"get-ip-intelligence","NAME":"GET_IP_INTELLIGENCE","index$":2}, {"active":true,"entity":"get_ip_intelligence","key$":"BasicGetIpIntelligenceFlow","kind":"basic","name":"BasicGetIpIntelligenceFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"get_ip_intelligence_ref01","srcdatavar":"get_ip_intelligence_ref01_data","suffix":"_dt0"},"match":{"id":"get_ip_intelligence01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_ip_intelligence_ref01"}}],"index$":0}]}, 'GetIpIntelligence')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_ip_intelligence_ref01_data = Object.values(setup.data.existing.get_ip_intelligence)[0] as any

    // LOAD
    const get_ip_intelligence_ref01_ent = client.GetIpIntelligence()
    const get_ip_intelligence_ref01_match_dt0: any = {}
    get_ip_intelligence_ref01_match_dt0.id = get_ip_intelligence_ref01_data.id
    const get_ip_intelligence_ref01_data_dt0 = (await get_ip_intelligence_ref01_ent.load(get_ip_intelligence_ref01_match_dt0)).data()
    assert(get_ip_intelligence_ref01_data_dt0.id === get_ip_intelligence_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_ip_intelligence/GetIpIntelligenceTestData.json')

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
    ['get_ip_intelligence01','get_ip_intelligence02','get_ip_intelligence03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IP_ADDRESS_TEST_GET_IP_INTELLIGENCE_ENTID': idmap,
    'IP_ADDRESS_TEST_LIVE': 'FALSE',
    'IP_ADDRESS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IP_ADDRESS_TEST_GET_IP_INTELLIGENCE_ENTID']

  const live = 'TRUE' === env.IP_ADDRESS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IP_ADDRESS_TEST_GET_IP_INTELLIGENCE_ENTID']
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
  
