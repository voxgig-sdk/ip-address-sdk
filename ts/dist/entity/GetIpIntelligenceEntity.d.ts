import { IpAddressEntityBase } from '../IpAddressEntityBase';
import type { IpAddressSDK } from '../IpAddressSDK';
import type { Control } from '../types';
import type { GetIpIntelligence, GetIpIntelligenceLoadMatch } from '../IpAddressTypes';
declare class GetIpIntelligenceEntity extends IpAddressEntityBase<GetIpIntelligence> {
    constructor(client: IpAddressSDK, entopts: any);
    make(this: GetIpIntelligenceEntity): GetIpIntelligenceEntity;
    load(this: any, reqmatch?: GetIpIntelligenceLoadMatch, ctrl?: Control): Promise<GetIpIntelligenceEntity>;
}
export { GetIpIntelligenceEntity };
