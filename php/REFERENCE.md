# IpAddress PHP SDK Reference

Complete API reference for the IpAddress PHP SDK.


## IpAddressSDK

### Constructor

```php
require_once __DIR__ . '/ip-address_sdk.php';

$client = new IpAddressSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IpAddressSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = IpAddressSDK::test();
```


### Instance Methods

#### `BulkQueryIP($data = null)`

Create a new `BulkQueryIPEntity` instance. Pass `null` for no initial data.

#### `GetCurrentIp($data = null)`

Create a new `GetCurrentIpEntity` instance. Pass `null` for no initial data.

#### `GetIpIntelligence($data = null)`

Create a new `GetIpIntelligenceEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## BulkQueryIPEntity

```php
$bulk_query_i_p = $client->bulk_query_i_p();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ip` | ``$STRING`` | No |  |
| `isp` | ``$STRING`` | No |  |
| `location` | ``$OBJECT`` | No |  |
| `risk` | ``$OBJECT`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->bulk_query_i_p()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): BulkQueryIPEntity`

Create a new `BulkQueryIPEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GetCurrentIpEntity

```php
$get_current_ip = $client->get_current_ip();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->get_current_ip()->load(["id" => "get_current_ip_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GetCurrentIpEntity`

Create a new `GetCurrentIpEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GetIpIntelligenceEntity

```php
$get_ip_intelligence = $client->get_ip_intelligence();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ip` | ``$STRING`` | No |  |
| `isp` | ``$STRING`` | No |  |
| `location` | ``$OBJECT`` | No |  |
| `risk` | ``$OBJECT`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->get_ip_intelligence()->load(["id" => "get_ip_intelligence_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GetIpIntelligenceEntity`

Create a new `GetIpIntelligenceEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new IpAddressSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

