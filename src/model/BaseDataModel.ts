import FCObject from './FCObject'
// @ts-ignore
export default class BaseDataModel extends FCObject {

    /*code*/
    code: number | undefined;
    /*接口返回信息*/
    msg: string | undefined;

    /*构建*/
    constructor( code: number, msg: string , data: object) {
        // @ts-ignore
        super(data);
        this.msg = msg;
        this.code = code;
        if (!data) {
            return;
        }
        // @ts-ignore
        this.modelAddProperty.call(this, data);
    
    }
}