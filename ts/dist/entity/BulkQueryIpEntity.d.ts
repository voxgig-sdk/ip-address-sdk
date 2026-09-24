import { IpAddressEntityBase } from '../IpAddressEntityBase';
import type { IpAddressSDK } from '../IpAddressSDK';
import type { Control } from '../types';
import type { BulkQueryIp, BulkQueryIpListMatch } from '../IpAddressTypes';
declare class BulkQueryIpEntity extends IpAddressEntityBase<BulkQueryIp> {
    constructor(client: IpAddressSDK, entopts: any);
    make(this: BulkQueryIpEntity): BulkQueryIpEntity;
    list(this: any, reqmatch?: BulkQueryIpListMatch, ctrl?: Control): Promise<BulkQueryIpEntity[]>;
}
export { BulkQueryIpEntity };
