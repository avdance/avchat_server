class Log {
    firstName : string;
    lastName : string;
    constructor(fiestName : string,  lastName : string) {
        this.firstName = fiestName;
        this.lastName = lastName;
    }
    greeter() {
        return "欢迎来到typescript的世界，hello" +
         this.firstName + " " + this.lastName;
    }
}
var user = new Log("王", "小二");
