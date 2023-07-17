import { ROLES } from "../../constants/roles";
import { IUser } from "../../interfaces/user.interface";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { UsersProductsEntity } from "./users.products.entity";

@Entity({name: "users"})
export class UsersEntity extends BaseEntity implements IUser {

    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column({unique: true})
    email: string;
    @Column()
    age: number;
    @Column({unique: true})
    username: string;
    @Column()
    password: string;
    @Column({type: 'enum', enum: ROLES})
    role: ROLES;

    @OneToMany(() => UsersProductsEntity, (userProduct) => userProduct.user)
    productsIncludes: UsersProductsEntity[]

}
