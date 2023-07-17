import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IProduct } from "src/interfaces/product.interface";

export class ProductDTO implements IProduct {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
