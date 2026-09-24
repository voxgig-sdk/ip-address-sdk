"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpAddressError = void 0;
class IpAddressError extends Error {
    isIpAddressError = true;
    sdk = 'IpAddress';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.IpAddressError = IpAddressError;
//# sourceMappingURL=IpAddressError.js.map