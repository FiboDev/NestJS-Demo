import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ProductDTO } from '../dto/product.dto';
import { UpdateProductDTO } from '../dto/update.dto';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsServices: ProductsService) {}

    @Get("all")
    public async findAllUsers() {

        return await this.productsServices.findProducts()
    }

    @Get(":id")
    public async findUserById(@Param('id') id: string) {

        return await this.productsServices.findProductById(id)
    }

    @Post('register')
    public async registerUser(@Body() data: ProductDTO) {

        return await this.productsServices.createProduct(data)
    }

    @Put('edit/:id')
    public async updateUser(@Param('id') id: string, @Body() data: UpdateProductDTO) {

        return await this.productsServices.updateProduct(data, id)
    }

    @Delete('delete/:id')
    public async deleteUser(@Param('id') id: string) {

        return await this.productsServices.deleteProduct(id)
    }
}
