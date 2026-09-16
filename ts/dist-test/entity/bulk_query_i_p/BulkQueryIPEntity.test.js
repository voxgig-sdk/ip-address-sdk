"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('BulkQueryIPEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IP_ADDRESS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IP_ADDRESS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IpAddressSDK.test();
        const ent = testsdk.BulkQueryIP();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IP_ADDRESS_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'bulk_query_i_p.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "ip", "req": false, "short": "The queried IP address", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "isp", "req": false, "short": "Internet Service Provider name", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "location", "req": false, "short": "Location information for the IP address", "type": "`$OBJECT`", "index$": 3 }, { "active": true, "name": "risk", "req": false, "short": "Risk assessment data for the IP address", "type": "`$OBJECT`", "index$": 4 }], "id": { "field": "id", "name": "id" }, "name": "bulk_query_i_p", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "1.1.1.1,8.8.8.8,9.9.9.9", "kind": "param", "name": "id", "orig": "ips", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "example": "json", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /{ips}", "json": "{\"operationId\":\"bulkQueryIPs\",\"parameters\":[{\"description\":\"Comma-separated list of IP addresses (max 10,000)\",\"in\":\"path\",\"name\":\"ips\",\"required\":true,\"schema\":{\"example\":\"1.1.1.1,8.8.8.8,9.9.9.9\",\"type\":\"string\"}},{\"description\":\"Response format\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"xml\",\"yaml\",\"text\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"ip\":{\"description\":\"The queried IP address\",\"example\":\"1.1.1.1\",\"type\":\"string\"},\"isp\":{\"description\":\"Internet Service Provider name\",\"example\":\"Cloudflare, Inc.\",\"type\":\"string\"},\"location\":{\"description\":\"Location information for the IP address\",\"properties\":{\"city\":{\"description\":\"City name\",\"example\":\"Los Angeles\",\"type\":\"string\"},\"country\":{\"description\":\"Full name of the country\",\"example\":\"United States\",\"type\":\"string\"},\"country_code\":{\"description\":\"Two-letter ISO 3166-1 alpha-2 country code\",\"example\":\"US\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"example\":34.0522,\"format\":\"float\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"example\":-118.2437,\"format\":\"float\",\"type\":\"number\"},\"state\":{\"description\":\"Region or state name\",\"example\":\"California\",\"type\":\"string\"},\"timezone\":{\"description\":\"Timezone identifier\",\"example\":\"America/Los_Angeles\",\"type\":\"string\"},\"zipcode\":{\"description\":\"Postal code\",\"example\":\"90001\",\"type\":\"string\"}},\"type\":\"object\"},\"risk\":{\"description\":\"Risk assessment data for the IP address\",\"properties\":{\"is_mobile\":{\"description\":\"True if associated with cellular network\",\"example\":false,\"type\":\"boolean\"},\"is_proxy\":{\"description\":\"True if is a known public proxy\",\"example\":false,\"type\":\"boolean\"},\"is_tor\":{\"description\":\"True if is a known Tor exit node\",\"example\":false,\"type\":\"boolean\"},\"is_vpn\":{\"description\":\"True if belongs to a known VPN provider\",\"example\":false,\"type\":\"boolean\"},\"risk_score\":{\"description\":\"0-100 score indicating malicious activity likelihood\",\"example\":0,\"maximum\":100,\"minimum\":0,\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"application/xml\":{\"schema\":{\"items\":{\"properties\":{\"ip\":{\"description\":\"The queried IP address\",\"example\":\"1.1.1.1\",\"type\":\"string\"},\"isp\":{\"description\":\"Internet Service Provider name\",\"example\":\"Cloudflare, Inc.\",\"type\":\"string\"},\"location\":{\"description\":\"Location information for the IP address\",\"properties\":{\"city\":{\"description\":\"City name\",\"example\":\"Los Angeles\",\"type\":\"string\"},\"country\":{\"description\":\"Full name of the country\",\"example\":\"United States\",\"type\":\"string\"},\"country_code\":{\"description\":\"Two-letter ISO 3166-1 alpha-2 country code\",\"example\":\"US\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"example\":34.0522,\"format\":\"float\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"example\":-118.2437,\"format\":\"float\",\"type\":\"number\"},\"state\":{\"description\":\"Region or state name\",\"example\":\"California\",\"type\":\"string\"},\"timezone\":{\"description\":\"Timezone identifier\",\"example\":\"America/Los_Angeles\",\"type\":\"string\"},\"zipcode\":{\"description\":\"Postal code\",\"example\":\"90001\",\"type\":\"string\"}},\"type\":\"object\"},\"risk\":{\"description\":\"Risk assessment data for the IP address\",\"properties\":{\"is_mobile\":{\"description\":\"True if associated with cellular network\",\"example\":false,\"type\":\"boolean\"},\"is_proxy\":{\"description\":\"True if is a known public proxy\",\"example\":false,\"type\":\"boolean\"},\"is_tor\":{\"description\":\"True if is a known Tor exit node\",\"example\":false,\"type\":\"boolean\"},\"is_vpn\":{\"description\":\"True if belongs to a known VPN provider\",\"example\":false,\"type\":\"boolean\"},\"risk_score\":{\"description\":\"0-100 score indicating malicious activity likelihood\",\"example\":0,\"maximum\":100,\"minimum\":0,\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"application/yaml\":{\"schema\":{\"items\":{\"properties\":{\"ip\":{\"description\":\"The queried IP address\",\"example\":\"1.1.1.1\",\"type\":\"string\"},\"isp\":{\"description\":\"Internet Service Provider name\",\"example\":\"Cloudflare, Inc.\",\"type\":\"string\"},\"location\":{\"description\":\"Location information for the IP address\",\"properties\":{\"city\":{\"description\":\"City name\",\"example\":\"Los Angeles\",\"type\":\"string\"},\"country\":{\"description\":\"Full name of the country\",\"example\":\"United States\",\"type\":\"string\"},\"country_code\":{\"description\":\"Two-letter ISO 3166-1 alpha-2 country code\",\"example\":\"US\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"example\":34.0522,\"format\":\"float\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"example\":-118.2437,\"format\":\"float\",\"type\":\"number\"},\"state\":{\"description\":\"Region or state name\",\"example\":\"California\",\"type\":\"string\"},\"timezone\":{\"description\":\"Timezone identifier\",\"example\":\"America/Los_Angeles\",\"type\":\"string\"},\"zipcode\":{\"description\":\"Postal code\",\"example\":\"90001\",\"type\":\"string\"}},\"type\":\"object\"},\"risk\":{\"description\":\"Risk assessment data for the IP address\",\"properties\":{\"is_mobile\":{\"description\":\"True if associated with cellular network\",\"example\":false,\"type\":\"boolean\"},\"is_proxy\":{\"description\":\"True if is a known public proxy\",\"example\":false,\"type\":\"boolean\"},\"is_tor\":{\"description\":\"True if is a known Tor exit node\",\"example\":false,\"type\":\"boolean\"},\"is_vpn\":{\"description\":\"True if belongs to a known VPN provider\",\"example\":false,\"type\":\"boolean\"},\"risk_score\":{\"description\":\"0-100 score indicating malicious activity likelihood\",\"example\":0,\"maximum\":100,\"minimum\":0,\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with bulk IP intelligence data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad Request - Invalid IP format or query parameters\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Too Many Requests - You have exceeded the rate limit\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal Server Error - Something went wrong on our end\"}},\"security\":[],\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/{ips}", "rename": { "param": { "ips": "id" } }, "segments": [{ "var": "id" }], "select": { "exist": ["format", "id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "bulk_query_i_p", "name__orig": "bulk_query_i_p", "Name": "BulkQueryIP", "name_": "bulk_query_i_p", "name-": "bulk-query-i-p", "NAME": "BULK_QUERY_I_P", "index$": 0 }, { "active": true, "entity": "bulk_query_i_p", "key$": "BasicBulkQueryIPFlow", "kind": "basic", "name": "BasicBulkQueryIPFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "ips": "ips01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "bulk_query_i_p_ref01" } }], "index$": 0 }] }, 'BulkQueryIP');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let bulk_query_i_p_ref01_data = Object.values(setup.data.existing.bulk_query_i_p)[0];
        // LIST
        const bulk_query_i_p_ref01_ent = client.BulkQueryIP();
        const bulk_query_i_p_ref01_match = {};
        bulk_query_i_p_ref01_match['ips'] = setup.idmap['ips01'];
        const bulk_query_i_p_ref01_list = (await bulk_query_i_p_ref01_ent.list(bulk_query_i_p_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/bulk_query_i_p/BulkQueryIPTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IpAddressSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['bulk_query_i_p01', 'bulk_query_i_p02', 'bulk_query_i_p03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IP_ADDRESS_TEST_BULK_QUERY_I_P_ENTID': idmap,
        'IP_ADDRESS_TEST_LIVE': 'FALSE',
        'IP_ADDRESS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['IP_ADDRESS_TEST_BULK_QUERY_I_P_ENTID'];
    const live = 'TRUE' === env.IP_ADDRESS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IP_ADDRESS_TEST_BULK_QUERY_I_P_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.IpAddressSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=BulkQueryIPEntity.test.js.map