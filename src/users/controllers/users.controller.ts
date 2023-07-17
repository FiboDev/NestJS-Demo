import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO } from '../dto/user.dto';
import { UpdateUserDTO } from '../dto/update.dto';
import { UserToProductDTO } from '../dto/user.product.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get("all")
    public async findAllUsers() {

        return await this.usersService.findUsers()
    }

    @Get(":id")
    public async findUserById(@Param('id') id: string) {

        return await this.usersService.findUserById(id)
    }

    @Post('register')
    public async registerUser(@Body() data: UserDTO) {

        return await this.usersService.createUser(data)
    }

    @Put('edit/:id')
    public async updateUser(@Param('id') id: string, @Body() data: UpdateUserDTO) {

        return await this.usersService.updateUser(data, id)
    }

    @Delete('delete/:id')
    public async deleteUser(@Param('id') id: string) {

        return await this.usersService.deleteUser(id)
    }

    @Post('add-to-product')
    public async addToProduct(@Body() data: UserToProductDTO) {

        return await this.usersService.relationToProduct(data)
    }
}
