import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: "user_base_info"})
export class LoginRecord { 

    @PrimaryGeneratedColumn({type: "int"})
    uid: number = 0;

    @Column({name: 'ip', type: 'varchar', length: 20})
    ip: string = "";

    @Column({name: 'terminal_type', type: 'varchar', length: 20})
    terminalType: string = "";

    @Column({name: 'terminal_info', type: 'varchar', length: 64})
    terminalInfo: string = "";

    @Column({name: 'header_image', type: "varchar", width: 10})
    headerImage: number = 0;

    @Column({name: 'logintime', type: 'int', length: 11})
    loginTime: string = "";

    @Column({type: 'varchar', length: 20, nullable: true})
    expand1: string | null = null;

    @Column({type: 'varchar', length: 20, nullable: true})
    expand2: string | null = null;
}
