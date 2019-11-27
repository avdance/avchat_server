import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: "user_friends"})
export class UserFriends {
    @PrimaryGeneratedColumn({type: "int"})
    uid: number = 0;

    @Column({name: 'nice_name', type: 'varchar', length: 20})
    userName: string = "";

    @Column({type: 'int', width: 2})
    gender: number = 0;

    @Column({type: 'int', width: 10})
    age: number = 0;

    @Column({name: 'header_image',type: 'varchar', length: 10, nullable: true})
    headerImage: string | null = null;

}