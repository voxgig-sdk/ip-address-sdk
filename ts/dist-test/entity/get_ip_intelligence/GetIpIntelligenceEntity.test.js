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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GetIpIntelligenceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IP_ADDRESS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IP_ADDRESS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IpAddressSDK.test();
        const ent = testsdk.GetIpIntelligence();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IP_ADDRESS_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'get_ip_intelligence.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 }, "ip": { "a": true, "h": "Ip", "n": "ip", "r": false, "sh": "The queried IP address", "t": "`$STRING`", "key$": "ip", "index$": 1 }, "isp": { "a": true, "h": "Isp", "n": "isp", "r": false, "sh": "Internet Service Provider name", "t": "`$STRING`", "key$": "isp", "index$": 2 }, "location": { "a": true, "h": "Location", "n": "location", "r": false, "sh": "Location information for the IP address", "t": "`$OBJECT`", "key$": "location", "index$": 3 }, "risk": { "a": true, "h": "Risk", "n": "risk", "r": false, "sh": "Risk assessment data for the IP address", "t": "`$OBJECT`", "key$": "risk", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "get_ip_intelligence", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /{ip}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "1.1.1.1", "k": "param", "n": "id", "or": "ip", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "json", "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/{ip}", "q": { "exist": ["format", "id"] }, "r": { "param": { "ip": "id" } }, "s": [{ "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "get_ip_intelligence", "name__orig": "get_ip_intelligence", "Name": "GetIpIntelligence", "name_": "get_ip_intelligence", "name-": "get-ip-intelligence", "NAME": "GET_IP_INTELLIGENCE", "index$": 2 }, { "active": true, "entity": "get_ip_intelligence", "key$": "BasicGetIpIntelligenceFlow", "kind": "basic", "name": "BasicGetIpIntelligenceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "get_ip_intelligence_ref01", "srcdatavar": "get_ip_intelligence_ref01_data", "suffix": "_dt0" }, "m": { "id": "get_ip_intelligence01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-get_ip_intelligence_ref01" } }], "index$": 0 }] }, 'GetIpIntelligence', { "GET /{ip}": { "protocol": "http", "operationId": "getIPIntelligence", "responses": { "200": { "description": "Successful response with IP intelligence data", "content": { "application/json": { "schema": { "type": "object", "properties": { "ip": { "description": "The queried IP address", "example": "1.1.1.1", "key$": "ip", "type": "string" }, "isp": { "description": "Internet Service Provider name", "example": "Cloudflare, Inc.", "key$": "isp", "type": "string" }, "location": { "description": "Location information for the IP address", "key$": "location", "properties": { "city": { "description": "City name", "example": "Los Angeles", "type": "string" }, "country": { "description": "Full name of the country", "example": "United States", "type": "string" }, "country_code": { "description": "Two-letter ISO 3166-1 alpha-2 country code", "example": "US", "type": "string" }, "latitude": { "description": "Latitude coordinate", "example": 34.0522, "format": "float", "type": "number" }, "longitude": { "description": "Longitude coordinate", "example": -118.2437, "format": "float", "type": "number" }, "state": { "description": "Region or state name", "example": "California", "type": "string" }, "timezone": { "description": "Timezone identifier", "example": "America/Los_Angeles", "type": "string" }, "zipcode": { "description": "Postal code", "example": "90001", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Location" }, "risk": { "description": "Risk assessment data for the IP address", "key$": "risk", "properties": { "is_mobile": { "description": "True if associated with cellular network", "example": false, "type": "boolean" }, "is_proxy": { "description": "True if is a known public proxy", "example": false, "type": "boolean" }, "is_tor": { "description": "True if is a known Tor exit node", "example": false, "type": "boolean" }, "is_vpn": { "description": "True if belongs to a known VPN provider", "example": false, "type": "boolean" }, "risk_score": { "description": "0-100 score indicating malicious activity likelihood", "example": 0, "maximum": 100, "minimum": 0, "type": "integer" } }, "type": "object", "x-ref": "#/components/schemas/Risk" } }, "x-ref": "#/components/schemas/IPIntelligence", "index$": 0 } }, "application/xml": { "schema": { "type": "object", "properties": { "ip": { "description": "The queried IP address", "example": "1.1.1.1", "key$": "ip", "type": "string" }, "isp": { "description": "Internet Service Provider name", "example": "Cloudflare, Inc.", "key$": "isp", "type": "string" }, "location": { "description": "Location information for the IP address", "key$": "location", "properties": { "city": { "description": "City name", "example": "Los Angeles", "type": "string" }, "country": { "description": "Full name of the country", "example": "United States", "type": "string" }, "country_code": { "description": "Two-letter ISO 3166-1 alpha-2 country code", "example": "US", "type": "string" }, "latitude": { "description": "Latitude coordinate", "example": 34.0522, "format": "float", "type": "number" }, "longitude": { "description": "Longitude coordinate", "example": -118.2437, "format": "float", "type": "number" }, "state": { "description": "Region or state name", "example": "California", "type": "string" }, "timezone": { "description": "Timezone identifier", "example": "America/Los_Angeles", "type": "string" }, "zipcode": { "description": "Postal code", "example": "90001", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Location" }, "risk": { "description": "Risk assessment data for the IP address", "key$": "risk", "properties": { "is_mobile": { "description": "True if associated with cellular network", "example": false, "type": "boolean" }, "is_proxy": { "description": "True if is a known public proxy", "example": false, "type": "boolean" }, "is_tor": { "description": "True if is a known Tor exit node", "example": false, "type": "boolean" }, "is_vpn": { "description": "True if belongs to a known VPN provider", "example": false, "type": "boolean" }, "risk_score": { "description": "0-100 score indicating malicious activity likelihood", "example": 0, "maximum": 100, "minimum": 0, "type": "integer" } }, "type": "object", "x-ref": "#/components/schemas/Risk" } }, "x-ref": "#/components/schemas/IPIntelligence" } }, "application/yaml": { "schema": { "type": "object", "properties": { "ip": { "description": "The queried IP address", "example": "1.1.1.1", "key$": "ip", "type": "string" }, "isp": { "description": "Internet Service Provider name", "example": "Cloudflare, Inc.", "key$": "isp", "type": "string" }, "location": { "description": "Location information for the IP address", "key$": "location", "properties": { "city": { "description": "City name", "example": "Los Angeles", "type": "string" }, "country": { "description": "Full name of the country", "example": "United States", "type": "string" }, "country_code": { "description": "Two-letter ISO 3166-1 alpha-2 country code", "example": "US", "type": "string" }, "latitude": { "description": "Latitude coordinate", "example": 34.0522, "format": "float", "type": "number" }, "longitude": { "description": "Longitude coordinate", "example": -118.2437, "format": "float", "type": "number" }, "state": { "description": "Region or state name", "example": "California", "type": "string" }, "timezone": { "description": "Timezone identifier", "example": "America/Los_Angeles", "type": "string" }, "zipcode": { "description": "Postal code", "example": "90001", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Location" }, "risk": { "description": "Risk assessment data for the IP address", "key$": "risk", "properties": { "is_mobile": { "description": "True if associated with cellular network", "example": false, "type": "boolean" }, "is_proxy": { "description": "True if is a known public proxy", "example": false, "type": "boolean" }, "is_tor": { "description": "True if is a known Tor exit node", "example": false, "type": "boolean" }, "is_vpn": { "description": "True if belongs to a known VPN provider", "example": false, "type": "boolean" }, "risk_score": { "description": "0-100 score indicating malicious activity likelihood", "example": 0, "maximum": 100, "minimum": 0, "type": "integer" } }, "type": "object", "x-ref": "#/components/schemas/Risk" } }, "x-ref": "#/components/schemas/IPIntelligence" } } } }, "400": { "description": "Bad Request - Invalid IP format or query parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "code": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } } } }, "429": { "description": "Too Many Requests - You have exceeded the rate limit", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "code": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal Server Error - Something went wrong on our end", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "code": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "ip", "in": "path", "description": "IP address to query", "required": true, "schema": { "type": "string", "example": "1.1.1.1" }, "index$": 0 }, { "name": "format", "in": "query", "description": "Response format", "required": false, "schema": { "type": "string", "enum": ["json", "xml", "yaml", "text"], "default": "json" }, "index$": 1 }], "security": [], "securitySource": "definition" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let get_ip_intelligence_ref01_data = Object.values(setup.data.existing.get_ip_intelligence)[0];
        // LOAD
        const get_ip_intelligence_ref01_ent = client.GetIpIntelligence();
        const get_ip_intelligence_ref01_match_dt0 = {};
        get_ip_intelligence_ref01_match_dt0.id = get_ip_intelligence_ref01_data.id;
        const get_ip_intelligence_ref01_data_dt0 = (await get_ip_intelligence_ref01_ent.load(get_ip_intelligence_ref01_match_dt0)).data();
        (0, node_assert_1.default)(get_ip_intelligence_ref01_data_dt0.id === get_ip_intelligence_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/get_ip_intelligence/GetIpIntelligenceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IpAddressSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['get_ip_intelligence01', 'get_ip_intelligence02', 'get_ip_intelligence03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IP_ADDRESS_TEST_GET_IP_INTELLIGENCE_ENTID': idmap,
        'IP_ADDRESS_TEST_LIVE': 'FALSE',
        'IP_ADDRESS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['IP_ADDRESS_TEST_GET_IP_INTELLIGENCE_ENTID'];
    const live = 'TRUE' === env.IP_ADDRESS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IP_ADDRESS_TEST_GET_IP_INTELLIGENCE_ENTID'];
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
//# sourceMappingURL=GetIpIntelligenceEntity.test.js.map