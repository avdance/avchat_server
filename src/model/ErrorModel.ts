import BaseDataModel from './BaseDataModel';
// @ts-ignore
export default class ErrorModel extends BaseDataModel {

    /*code*/
    errCode: number | undefined;
    /*接口返回信息*/
    msg: string | undefined;

    /*构建*/
    constructor( errCode: number, msg: string, data: object) {
        // @ts-ignore
        super(data);
        this.msg = msg;
        this.errCode = errCode;
        if (!data) {
            return;
        }
        // @ts-ignore
        this.modelAddProperty.call(this, data);
    
    }
}