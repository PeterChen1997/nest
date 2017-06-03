import { RouteParamtypes } from '@nestjs/common/enums/route-paramtypes.enum';
import { Paramtype } from '@nestjs/common';

export class ParamsTokenFactory {
    public exchangeEnumForString(type: RouteParamtypes): Paramtype {
        switch (type) {
            case RouteParamtypes.BODY: return 'body';
            case RouteParamtypes.PARAM: return 'param';
            case RouteParamtypes.QUERY: return 'query';
            default: return null;
        }
    }
}