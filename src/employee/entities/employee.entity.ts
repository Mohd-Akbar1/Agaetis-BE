import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

export enum Role {
    ADMIN = 'admin',
    USER = 'user'
}
@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number

    @Column()   
    name: string

    @Column({unique: true})
    email: string

    @Column({type: 'enum', enum: Role, default: Role.USER})
    role: Role

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

}
