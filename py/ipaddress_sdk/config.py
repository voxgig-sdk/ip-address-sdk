# IpAddress SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "IpAddress",
            "slug": "ip-address",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.ipquery.io",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "bulk_query_i_p": {},
                "get_current_ip": {},
                "get_ip_intelligence": {},
            },
        },
        "entity": {
      "bulk_query_i_p": {
        "fields": [
          {
            "name": "ip",
            "short": "The queried IP address",
            "type": "`$STRING`",
          },
          {
            "name": "isp",
            "short": "Internet Service Provider name",
            "type": "`$STRING`",
          },
          {
            "name": "location",
            "short": "Location information for the IP address",
            "type": "`$OBJECT`",
          },
          {
            "name": "risk",
            "short": "Risk assessment data for the IP address",
            "type": "`$OBJECT`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "json",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{ips}",
                "parts": [
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ips": "id",
                  },
                },
                "select": {
                  "exist": [
                    "format",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/",
                "parts": [],
                "select": {
                  "exist": [
                    "format",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_ip_intelligence": {
        "fields": [
          {
            "name": "ip",
            "short": "The queried IP address",
            "type": "`$STRING`",
          },
          {
            "name": "isp",
            "short": "Internet Service Provider name",
            "type": "`$STRING`",
          },
          {
            "name": "location",
            "short": "Location information for the IP address",
            "type": "`$OBJECT`",
          },
          {
            "name": "risk",
            "short": "Risk assessment data for the IP address",
            "type": "`$OBJECT`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "json",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{ip}",
                "parts": [
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ip": "id",
                  },
                },
                "select": {
                  "exist": [
                    "format",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
