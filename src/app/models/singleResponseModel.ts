import { ResponseModel } from "./responseModel";

export interface SingleResponseModel<TEntity> extends ResponseModel{
    data:TEntity
}