"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
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
            "format": "v1"
        },
        "headers": [],
        "query": [
            "format"
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "ip": "1.1.1.1",
                "isp": "Cloudflare, Inc.",
                "location": {
                    "city": "Los Angeles",
                    "country": "United States",
                    "country_code": "US",
                    "latitude": 34.0522,
                    "longitude": -118.2437,
                    "state": "California",
                    "timezone": "America/Los_Angeles",
                    "zipcode": "90001"
                },
                "risk": {
                    "is_mobile": false,
                    "is_proxy": false,
                    "is_tor": false,
                    "is_vpn": false,
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
            "format": "v1"
        },
        "headers": [],
        "query": [
            "format"
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
            "format": "v1"
        },
        "headers": [],
        "query": [
            "format"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "ip": "1.1.1.1",
            "isp": "Cloudflare, Inc.",
            "location": {
                "city": "Los Angeles",
                "country": "United States",
                "country_code": "US",
                "latitude": 34.0522,
                "longitude": -118.2437,
                "state": "California",
                "timezone": "America/Los_Angeles",
                "zipcode": "90001"
            },
            "risk": {
                "is_mobile": false,
                "is_proxy": false,
                "is_tor": false,
                "is_vpn": false,
                "risk_score": 0
            }
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map