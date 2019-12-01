interface IFCObject {
    modelAddProperty: (data: any) => void;
    modelCustomPropertyMapper: () => object;
    modelContainerPropertyGenericClass: () => object;
}

export default class FCObject  implements IFCObject{

 modelAddProperty(data: any){
        if (data){
            for (let key in data){
                if(!data.hasOwnProperty(key)){
                     continue;
                } 
                var propertyKey = key;
                if (this.hasOwnProperty('modelCustomPropertyMapper')) {
                    propertyKey = this.modelCustomPropertyMapper()[key] ? this.modelCustomPropertyMapper()[key] : key;
                }
                if (this.hasOwnProperty('modelContainerPropertyGenericClass')) {
                    if (this.modelContainerPropertyGenericClass()[propertyKey]){
                        let Class = this.modelContainerPropertyGenericClass()[propertyKey];
                        if (data[key] instanceof Array) {
                            this[propertyKey] = [];
                            for (let eachData of data[key]){
                                var obj = new Class(eachData);
                                this[propertyKey].push(obj);
                            }
                        }else {
                            this[propertyKey] = new Class(data[key]);
                        }
                        continue;
                    }
                }
                this[propertyKey] = data[key];
            }
        }
    }

    modelCustomPropertyMapper = function() {return{}}

    modelContainerPropertyGenericClass = function() {return{}}
}