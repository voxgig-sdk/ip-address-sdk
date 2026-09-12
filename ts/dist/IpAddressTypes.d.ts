export interface BulkQueryIP {
    id?: string;
    ip?: string;
    isp?: string;
    location?: Record<string, any>;
    risk?: Record<string, any>;
}
export interface BulkQueryIPListMatch {
    id: string;
    format?: string;
}
export interface GetCurrentIp {
}
export interface GetCurrentIpLoadMatch {
    format?: string;
}
export interface GetIpIntelligence {
    id?: string;
    ip?: string;
    isp?: string;
    location?: Record<string, any>;
    risk?: Record<string, any>;
}
export interface GetIpIntelligenceLoadMatch {
    id: string;
    format?: string;
}
