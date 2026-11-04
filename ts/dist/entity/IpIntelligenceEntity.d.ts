import { IpAddressEntityBase } from '../IpAddressEntityBase';
import type { IpAddressSDK } from '../IpAddressSDK';
import type { Control } from '../types';
import type { IpIntelligence, IpIntelligenceLoadMatch } from '../IpAddressTypes';
declare class IpIntelligenceEntity extends IpAddressEntityBase<IpIntelligence> {
    constructor(client: IpAddressSDK, entopts: any);
    make(this: IpIntelligenceEntity): IpIntelligenceEntity;
    load(this: any, reqmatch?: IpIntelligenceLoadMatch, ctrl?: Control): Promise<IpIntelligenceEntity>;
}
export { IpIntelligenceEntity };
