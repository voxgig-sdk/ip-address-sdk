# IpAddress Python SDK Reference

Complete API reference for the IpAddress Python SDK.


## IpAddressSDK

### Constructor

```python
from ipaddress_sdk import IpAddressSDK

client = IpAddressSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IpAddressSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = IpAddressSDK.test()
```


### Instance Methods

#### `BulkQueryIP(data=None)`

Create a new `BulkQueryIPEntity` instance. Pass `None` for no initial data.

#### `GetCurrentIp(data=None)`

Create a new `GetCurrentIpEntity` instance. Pass `None` for no initial data.

#### `GetIpIntelligence(data=None)`

Create a new `GetIpIntelligenceEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BulkQueryIPEntity

```python
bulk_query_i_p = client.BulkQueryIP()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ip` | `str` | No |  |
| `isp` | `str` | No |  |
| `location` | `dict` | No |  |
| `risk` | `dict` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.BulkQueryIP().list()
for bulk_query_i_p in results:
    print(bulk_query_i_p)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BulkQueryIPEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GetCurrentIpEntity

```python
get_current_ip = client.GetCurrentIp()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.GetCurrentIp().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetCurrentIpEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GetIpIntelligenceEntity

```python
get_ip_intelligence = client.GetIpIntelligence()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ip` | `str` | No |  |
| `isp` | `str` | No |  |
| `location` | `dict` | No |  |
| `risk` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.GetIpIntelligence().load({"id": "get_ip_intelligence_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetIpIntelligenceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = IpAddressSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

