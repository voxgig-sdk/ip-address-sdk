import { BulkQueryIpEntity } from './entity/BulkQueryIpEntity';
import { CurrentIpEntity } from './entity/CurrentIpEntity';
import { IpIntelligenceEntity } from './entity/IpIntelligenceEntity';
export type * from './IpAddressTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { IpAddressEntityBase } from './IpAddressEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
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
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    BulkQueryIp(entopts?: Record<string, any>): BulkQueryIpEntity;
    CurrentIp(entopts?: Record<string, any>): CurrentIpEntity;
    IpIntelligence(entopts?: Record<string, any>): IpIntelligenceEntity;
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
export type { DirectResult };
