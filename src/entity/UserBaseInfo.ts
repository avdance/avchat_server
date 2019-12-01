import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: "avchat_user_base_info"})
export class UserBaseInfo {

    @PrimaryGeneratedColumn({type: "int"})
    uid: number = 0;

    @Column({name: 'user_name', type: 'varchar', length: 20})
    userName: string = "";

    @Column({type: 'varchar', length: 20})
    password: string = "";

    @Column({name: 'nice_name', type: 'varchar', length: 20})
    niceName: string = "";

    @Column({name: 'login_status', type: "int", width: 10})
    loginStatus: number = 0;

    @Column({name: 'terminal_type', type: "int", width: 10})
    terminalType: number = 0;

    @Column({name: 'table_name', type: 'varchar', length: 20})
    tableName: string = "";

    @Column({type: 'int', width: 2})
    gender: number = 0;

    @Column({name: 'header_image', type: 'varchar', length: 10, nullable: true})
    headerImage: string | null = null;

    @Column({name: 'status', type: "int", width: 10})
    status: number = 0;

    @Column({type: 'date', nullable: true})
    createtime: Date | null = new Date('1970-01-01');
}
