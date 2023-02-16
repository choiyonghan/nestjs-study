import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private userService: UserService,
  ) {}

  @Get()
  @Render('user/index')
  async index(@Query() dto: SearchUserDto) {
    return {
      users: await this.userRepository.find({ take: dto.limit }),
    };
  }

  @Get(':id/edit')
  @Render('user/edit')
  async editView(@Param('id') id: number) {
    return { user: await this.userRepository.findOne({ where: { id } }) };
  }

  @Get('/save')
  @Render('user/save')
  async saveView() {
    return;
  }

  @Put(':id')
  @Redirect('/user')
  async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    await this.userService.update({
      id,
      firstName: dto.firstName,
    });
  }

  @Post('save')
  @Redirect('/user')
  async save(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('isActive') isActive: boolean,
  ) {
    const userEntity = this.userRepository.create();
    userEntity.firstName = firstName;
    userEntity.lastName = lastName;
    userEntity.isActive = isActive;

    return this.userRepository.save(userEntity);
  }

  @Delete(':id')
  @Redirect('/user')
  async delete(@Param('id') id: number) {
    return this.userRepository.delete({ id });
  }

  @Get('relation')
  async withRelation() {
    return this.userRepository.find({ relations: ['addressList'] });
  }
}
