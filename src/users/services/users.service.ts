import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDTO } from '../dto/user.dto';
import { UpdateUserDTO } from '../dto/update.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UsersEntity } from '../entities/users.entity';
import { UserToProductDTO } from '../dto/user.product.dto';
import { UsersProductsEntity } from '../entities/users.products.entity';


@Injectable()
export class UsersService {

    constructor(@InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>,
                @InjectRepository(UsersProductsEntity) private readonly userProductRepository: Repository<UsersProductsEntity>) {}

    public async createUser(data: UserDTO): Promise<UsersEntity> {

        try {

            console.log(data)

            const existingUser = await this.userRepository.findBy({username: data.username})

            console.log(existingUser)

            if (existingUser) {

                throw new ErrorManager({

                    type: 'NOT_ACCEPTABLE',
                    message: "El usuario ya existe"
                })
            }

            return await this.userRepository.save(data)


        } catch (error) {

            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async findUsers(): Promise<UsersEntity[]> {

        try {

            const users: UsersEntity[] = await this.userRepository.find()

            if (users.length === 0) {

                throw new ErrorManager({

                    type: 'BAD_REQUEST',
                    message: "No se encontró resultados"
                })
            }

            return users

        } catch (error) {

            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async findUserById(id: string): Promise<UsersEntity> {

        try {

            const user: UsersEntity =  await this.userRepository.createQueryBuilder('user')
            .where({id})
            .leftJoinAndSelect('user.productsIncludes', 'productsIncludes')
            .leftJoinAndSelect('productsIncludes.product', 'product')
            .getOne()

            if (!user) {

                throw new ErrorManager({

                    type: 'BAD_REQUEST',
                    message: "No se encontró resultados"
                })
            }

            return user

        } catch (error) {

            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async updateUser(data: UpdateUserDTO, id: string): Promise<UpdateResult | undefined> {

        try {

            const user: UpdateResult = await this.userRepository.update(id, data)

            if (user.affected === 0) {

                throw new ErrorManager({

                    type: 'BAD_REQUEST',
                    message: "No se pudo actualizar"
                })
            }

            return user

        } catch (error) {

            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async deleteUser(id: string): Promise<DeleteResult | undefined> {

        try {

            const user: DeleteResult = await this.userRepository.delete(id)

            if (user.affected === 0) {

                throw new ErrorManager({

                    type: 'BAD_REQUEST',
                    message: "No se pudo borrar"
                })
            }

            return user

        } catch (error) {

            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async relationToProduct(data: UserToProductDTO): Promise<UserToProductDTO> {

        try {

            console.log(data)

            return await this.userProductRepository.save(data)


        } catch (error) {

            throw ErrorManager.createSignatureError(error.message)
        }
    }
}
