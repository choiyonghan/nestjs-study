import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { TrainerModule } from './trainer/trainer.module';
import { Trainer } from './trainer/entity/trainer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test.sqlite',
      entities: [User, Trainer],
      synchronize: true,
      logging: true,
      logger: 'file',
    }),
    UserModule,
    TrainerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
