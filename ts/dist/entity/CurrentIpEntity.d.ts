import { IpAddressEntityBase } from '../IpAddressEntityBase';
import type { IpAddressSDK } from '../IpAddressSDK';
import type { Control } from '../types';
import type { CurrentIp, CurrentIpLoadMatch } from '../IpAddressTypes';
declare class CurrentIpEntity extends IpAddressEntityBase<CurrentIp> {
    constructor(client: IpAddressSDK, entopts: any);
    make(this: CurrentIpEntity): CurrentIpEntity;
    load(this: any, reqmatch?: CurrentIpLoadMatch, ctrl?: Control): Promise<CurrentIpEntity>;
}
export { CurrentIpEntity };
