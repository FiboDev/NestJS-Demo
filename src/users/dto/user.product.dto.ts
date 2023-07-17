import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { UsersEntity } from "../entities/users.entity";
import { ProductsEntity } from "src/products/entities/products.entity";
import { ACCESS_LEVEL } from "src/constants/roles";

export class UserToProductDTO {

    @IsNotEmpty()
    @IsUUID()
    user: UsersEntity

    @IsNotEmpty()
    @IsUUID()
    product: ProductsEntity

    @IsNotEmpty()
    @IsEnum(ACCESS_LEVEL)
    accessLevel: ACCESS_LEVEL
}
