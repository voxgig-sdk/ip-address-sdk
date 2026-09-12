import { BulkQueryIPEntity } from './entity/BulkQueryIPEntity';
import { GetCurrentIpEntity } from './entity/GetCurrentIpEntity';
import { GetIpIntelligenceEntity } from './entity/GetIpIntelligenceEntity';
export type * from './IpAddressTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { IpAddressEntityBase } from './IpAddressEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class IpAddressSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    BulkQueryIP(entopts?: Record<string, any>): BulkQueryIPEntity;
    GetCurrentIp(entopts?: Record<string, any>): GetCurrentIpEntity;
    GetIpIntelligence(entopts?: Record<string, any>): GetIpIntelligenceEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): IpAddressSDK;
    tester(testopts?: any, sdkopts?: any): IpAddressSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof IpAddressSDK;
export { stdutil, config, BaseFeature, IpAddressEntityBase, IpAddressSDK, SDK, };
