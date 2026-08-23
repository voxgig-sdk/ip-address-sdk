
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'IpAddress',
        slug: "ip-address",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.ipquery.io",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      bulk_query_i_p: {
      },

      get_current_ip: {
      },

      get_ip_intelligence: {
      },

    }
  }


  entity = {
    "bulk_query_i_p": {
      "fields": [
        {
          "name": "ip",
          "short": "The queried IP address",
          "type": "`$STRING`"
        },
        {
          "name": "isp",
          "short": "Internet Service Provider name",
          "type": "`$STRING`"
        },
        {
          "name": "location",
          "short": "Location information for the IP address",
          "type": "`$OBJECT`"
        },
        {
          "name": "risk",
          "short": "Risk assessment data for the IP address",
          "type": "`$OBJECT`"
        }
      ],
      "name": "bulk_query_i_p",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "1.1.1.1,8.8.8.8,9.9.9.9",
                    "kind": "param",
                    "name": "id",
                    "orig": "ips",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "example": "json",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ips}",
              "parts": [
                "{id}"
              ],
              "rename": {
                "param": {
                  "ips": "id"
                }
              },
              "select": {
                "exist": [
                  "format",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "get_current_ip": {
      "fields": [],
      "name": "get_current_ip",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "text",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/",
              "parts": [],
              "select": {
                "exist": [
                  "format"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "get_ip_intelligence": {
      "fields": [
        {
          "name": "ip",
          "short": "The queried IP address",
          "type": "`$STRING`"
        },
        {
          "name": "isp",
          "short": "Internet Service Provider name",
          "type": "`$STRING`"
        },
        {
          "name": "location",
          "short": "Location information for the IP address",
          "type": "`$OBJECT`"
        },
        {
          "name": "risk",
          "short": "Risk assessment data for the IP address",
          "type": "`$OBJECT`"
        }
      ],
      "name": "get_ip_intelligence",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "1.1.1.1",
                    "kind": "param",
                    "name": "id",
                    "orig": "ip",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "example": "json",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ip}",
              "parts": [
                "{id}"
              ],
              "rename": {
                "param": {
                  "ip": "id"
                }
              },
              "select": {
                "exist": [
                  "format",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

