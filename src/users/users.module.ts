import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { UsersProductsEntity } from './entities/users.products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, UsersProductsEntity])
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
