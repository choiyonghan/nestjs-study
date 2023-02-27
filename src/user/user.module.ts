import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { Trainer } from '../trainer/entity/trainer.entity';
import { TrainerModule } from '../trainer/trainer.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Trainer]), TrainerModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
