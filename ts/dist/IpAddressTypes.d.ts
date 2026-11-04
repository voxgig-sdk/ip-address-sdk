export interface BulkQueryIp {
    ip?: string;
    isp?: string;
    location?: Record<string, any>;
    risk?: Record<string, any>;
}
export interface BulkQueryIpListMatch {
    ips: string;
    format?: string;
}
export interface CurrentIp {
}
export interface CurrentIpLoadMatch {
    format?: string;
}
export interface IpIntelligence {
    ip?: string;
    isp?: string;
    location?: Record<string, any>;
    risk?: Record<string, any>;
}
export interface IpIntelligenceLoadMatch {
    id: string;
    format?: string;
}
