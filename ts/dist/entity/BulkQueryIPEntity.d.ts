import { IpAddressEntityBase } from '../IpAddressEntityBase';
import type { IpAddressSDK } from '../IpAddressSDK';
import type { Control } from '../types';
import type { BulkQueryIP, BulkQueryIPListMatch } from '../IpAddressTypes';
declare class BulkQueryIPEntity extends IpAddressEntityBase<BulkQueryIP> {
    constructor(client: IpAddressSDK, entopts: any);
    make(this: BulkQueryIPEntity): BulkQueryIPEntity;
    list(this: any, reqmatch?: BulkQueryIPListMatch, ctrl?: Control): Promise<BulkQueryIPEntity[]>;
}
export { BulkQueryIPEntity };
