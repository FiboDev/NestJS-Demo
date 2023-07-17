import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from '../entities/products.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { ProductDTO } from '../dto/product.dto';
import { UpdateProductDTO } from '../dto/update.dto';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(ProductsEntity) private readonly productsRepository: Repository<ProductsEntity>) {}

    public async createProduct(data: ProductDTO): Promise<ProductsEntity> {

        try {

            console.log(data)

            return await this.productsRepository.save(data)


        } catch (error) {

            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async findProducts(): Promise<ProductsEntity[]> {

        try {

            const products: ProductsEntity[] = await this.productsRepository.find()

            if (products.length === 0) {

                throw new ErrorManager({

                    type: 'BAD_REQUEST',
                    message: "No se encontró resultados"
                })
            }

            return products

        } catch (error) {

            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async findProductById(id: string): Promise<ProductsEntity> {

        try {

            const product: ProductsEntity =  await this.productsRepository.createQueryBuilder('product').where({id}).getOne()

            if (!product) {

                throw new ErrorManager({

                    type: 'BAD_REQUEST',
                    message: "No se encontró resultados"
                })
            }

            return product

        } catch (error) {

            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async updateProduct(data: UpdateProductDTO, id: string): Promise<UpdateResult | undefined> {

        try {

            const product: UpdateResult = await this.productsRepository.update(id, data)

            if (product.affected === 0) {

                throw new ErrorManager({

                    type: 'BAD_REQUEST',
                    message: "No se pudo actualizar"
                })
            }

            return product

        } catch (error) {

            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async deleteProduct(id: string): Promise<DeleteResult | undefined> {

        try {

            const product: DeleteResult = await this.productsRepository.delete(id)

            if (product.affected === 0) {

                throw new ErrorManager({

                    type: 'BAD_REQUEST',
                    message: "No se pudo borrar"
                })
            }

            return product

        } catch (error) {

            throw ErrorManager.createSignatureError(error.message)
        }
    }
}
