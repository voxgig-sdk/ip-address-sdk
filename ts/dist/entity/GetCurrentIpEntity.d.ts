import { IpAddressEntityBase } from '../IpAddressEntityBase';
import type { IpAddressSDK } from '../IpAddressSDK';
import type { Control } from '../types';
import type { GetCurrentIp, GetCurrentIpLoadMatch } from '../IpAddressTypes';
declare class GetCurrentIpEntity extends IpAddressEntityBase<GetCurrentIp> {
    constructor(client: IpAddressSDK, entopts: any);
    make(this: GetCurrentIpEntity): GetCurrentIpEntity;
    load(this: any, reqmatch?: GetCurrentIpLoadMatch, ctrl?: Control): Promise<GetCurrentIpEntity>;
}
export { GetCurrentIpEntity };
