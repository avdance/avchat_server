import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: "user_detail_info"})
export class UserDetailInfo {

    @PrimaryGeneratedColumn({type: "int"})
    uid: number = 0;

    @Column({name: 'user_name', type: 'varchar', length: 20})
    userName: string = "";

    @Column({type: 'varchar', length: 20})
    password: string = "";

    @Column({type: 'int', width: 2})
    gender: number = 0;

    @Column({name: 'nice_name', type: 'varchar', length: 20})
    niceName: string = "";

    @Column({name: 'real_name', type: 'varchar', length: 20, nullable: true})
    realName: string | null = null;

    @Column({type: 'int', width: 10})
    age: number = 0;

    @Column({type: 'date', nullable: true})
    birthday: Date | null = new Date('1970-01-01');

    @Column({name: 'login_status', type: "int", width: 10})
    loginStatus: number = 0;

    @Column({name: 'terminal_type', type: "int", width: 10})
    terminalType: number = 0;

    @Column({name: 'self_sign', type: 'varchar', length: 50, nullable: true})
    selfSign: string | null = null;
    
    @Column({type: 'varchar', length: 20, nullable: true})
    company: string | null = null;

    @Column({name: 'job_title', type: 'varchar', length: 20, nullable: true})
    jobTitle: string | null = null;

    @Column({type: 'varchar', length: 20, nullable: true})
    area: string | null = null;

    @Column({type: 'varchar', length: 20, nullable: true})
    hometown: string | null = null;

    @Column({type: 'varchar', length: 11})
    mobile: string = ""

    @Column({type: 'varchar', length: 20, nullable: true})
    email: string | null = null;

    @Column({name: 'person_info', type: 'varchar', length: 50, nullable: true})
    personInfo: string | null = null;

    @Column({name: 'header_image', type: 'varchar', length: 10, nullable: true})
    headerImage: string | null = null;
}
