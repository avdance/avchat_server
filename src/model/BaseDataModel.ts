import FCObject from './FCObject'
// @ts-ignore
export default class BaseDataModel extends FCObject {

    /*接口返回信息*/
    msg: string | undefined;

    /*构建*/
    constructor( msg: string , data: object) {
        // @ts-ignore
        super(data);
        this.msg = msg;
        if (!data) {
            return;
        }
        // @ts-ignore
        this.modelAddProperty.call(this, data);
    
    }
}