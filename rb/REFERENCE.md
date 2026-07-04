# IpAddress Ruby SDK Reference

Complete API reference for the IpAddress Ruby SDK.


## IpAddressSDK

### Constructor

```ruby
require_relative 'ip-address_sdk'

client = IpAddressSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IpAddressSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = IpAddressSDK.test
```


### Instance Methods

#### `BulkQueryIP(data = nil)`

Create a new `BulkQueryIP` entity instance. Pass `nil` for no initial data.

#### `GetCurrentIp(data = nil)`

Create a new `GetCurrentIp` entity instance. Pass `nil` for no initial data.

#### `GetIpIntelligence(data = nil)`

Create a new `GetIpIntelligence` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## BulkQueryIPEntity

```ruby
bulk_query_i_p = client.bulk_query_i_p
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ip` | ``$STRING`` | No |  |
| `isp` | ``$STRING`` | No |  |
| `location` | ``$OBJECT`` | No |  |
| `risk` | ``$OBJECT`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.bulk_query_i_p.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BulkQueryIPEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GetCurrentIpEntity

```ruby
get_current_ip = client.get_current_ip
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.get_current_ip.load({ "id" => "get_current_ip_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GetCurrentIpEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GetIpIntelligenceEntity

```ruby
get_ip_intelligence = client.get_ip_intelligence
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ip` | ``$STRING`` | No |  |
| `isp` | ``$STRING`` | No |  |
| `location` | ``$OBJECT`` | No |  |
| `risk` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.get_ip_intelligence.load({ "id" => "get_ip_intelligence_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GetIpIntelligenceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = IpAddressSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

