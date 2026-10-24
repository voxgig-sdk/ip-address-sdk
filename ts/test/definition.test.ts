import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "bulk_query_ip",
    "accessor": "BulkQueryIp",
    "op": "list",
    "method": "GET",
    "path": "/{ips}",
    "args": [
      {
        "name": "id",
        "wire": "ips",
        "value": "1.1.1.1,8.8.8.8,9.9.9.9"
      }
    ],
    "select": {
      "format": "json"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json",
      "application/xml",
      "application/yaml"
    ],
    "query": [
      "format"
    ],
    "queryArgs": [
      {
        "name": "format",
        "wire": "format"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "ip": "1.1.1.1",
        "isp": "Cloudflare, Inc.",
        "location": {
          "country": "United States",
          "country_code": "US",
          "city": "Los Angeles",
          "state": "California",
          "zipcode": "90001",
          "latitude": 34.0522,
          "longitude": -118.2437,
          "timezone": "America/Los_Angeles"
        },
        "risk": {
          "is_mobile": false,
          "is_vpn": false,
          "is_tor": false,
          "is_proxy": false,
          "risk_score": 0
        }
      }
    ],
    "idField": "id"
  },
  {
    "entity": "get_current_ip",
    "accessor": "GetCurrentIp",
    "op": "load",
    "method": "GET",
    "path": "/",
    "args": [],
    "select": {
      "format": "text"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "text/plain",
      "application/json",
      "application/xml",
      "application/yaml"
    ],
    "query": [
      "format"
    ],
    "queryArgs": [
      {
        "name": "format",
        "wire": "format"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": "1.1.1.1",
    "idField": "id"
  },
  {
    "entity": "get_ip_intelligence",
    "accessor": "GetIpIntelligence",
    "op": "load",
    "method": "GET",
    "path": "/{ip}",
    "args": [
      {
        "name": "id",
        "wire": "ip",
        "value": "1.1.1.1"
      }
    ],
    "select": {
      "format": "json"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json",
      "application/xml",
      "application/yaml"
    ],
    "query": [
      "format"
    ],
    "queryArgs": [
      {
        "name": "format",
        "wire": "format"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "ip": "1.1.1.1",
      "isp": "Cloudflare, Inc.",
      "location": {
        "country": "United States",
        "country_code": "US",
        "city": "Los Angeles",
        "state": "California",
        "zipcode": "90001",
        "latitude": 34.0522,
        "longitude": -118.2437,
        "timezone": "America/Los_Angeles"
      },
      "risk": {
        "is_mobile": false,
        "is_vpn": false,
        "is_tor": false,
        "is_proxy": false,
        "risk_score": 0
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
