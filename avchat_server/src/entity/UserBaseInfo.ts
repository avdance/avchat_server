import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: "user_base_info"})
export class UserBaseInfo {

    @PrimaryGeneratedColumn({type: "int"})
    id: number = 0;

    @Column({type: "int", width: 10})
    uid: number = 0;

    @Column({name: 'user_name', type: 'varchar', width: 20})
    userName: string = "";

    @Column({type: 'varchar', width: 20})
    password: string = "";

    @Column({name: 'nice_name', type: 'varchar', width: 20})
    niceName: string = "";

    @Column({name: 'login_status', type: "int", width: 10})
    loginStatus: number = 0;

    @Column({name: 'terminal_type', type: "int", width: 10})
    terminalType: number = 0;

    @Column({name: 'table_name', type: 'varchar', width: 20})
    tableName: string = "";

    @Column({type: 'varchar', width: 20})
    expand1: string | null = null;

    @Column({type: 'varchar', width: 20})
    expand2: string | null = null;
}
