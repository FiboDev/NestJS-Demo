import { IProduct } from "../../interfaces/product.interface";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { UsersProductsEntity } from "../../users/entities/users.products.entity";

@Entity({name: "products"})
export class ProductsEntity extends BaseEntity implements IProduct {

    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    price: number;

    @OneToMany(() => UsersProductsEntity, (userProduct) => userProduct.product)
    usersIncludes: UsersProductsEntity[]

}
