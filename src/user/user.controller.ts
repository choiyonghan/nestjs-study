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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SearchUserDto } from './dto/search-user.dto';
import { UserService } from './user.service';
import { InsertUserDto } from './dto/insert-user.dto';
import { TrainerService } from '../trainer/trainer.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private trainerService: TrainerService,
  ) {}

  @Get()
  @Render('user/index')
  @UsePipes(ValidationPipe)
  async index(@Query() dto: SearchUserDto) {
    const [result, total] = await this.userService.search(dto);
    return {
      users: result,
      total: total,
      currentPage: dto.page,
    };
  }

  @Get('/empty')
  @Render('user/save')
  async getInitDetail() {
    return { trainers: await this.trainerService.findAll() };
  }

  @Post()
  @Redirect('/user')
  @UsePipes(ValidationPipe)
  async save(@Body() dto: InsertUserDto) {
    await this.userService.save(dto);
  }

  @Delete(':id')
  @Redirect('/user')
  async delete(@Param('id') id: number) {
    await this.userService.delete(id);
  }

  @Get('edit/:id')
  @Render('user/edit')
  async editView(@Param('id') id: number) {
    return {
      user: await this.userService.getDetail(id),
      trainers: await this.trainerService.findAll(),
    };
  }

  @Get('detail/:id')
  @Render('user/detail')
  async detailView(@Param('id') id: number) {
    return {
      user: await this.userService.getDetail(id),
    };
  }

  @Put(':id')
  @Redirect('/user')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    await this.userService.update({
      id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      birthday: Number(dto.birthday.replace(/\-/g, '')),
      height: dto.height,
      weight: dto.weight,
      gender: dto.gender,
      address: dto.address,
      phone: dto.phone,
      adminId: dto.adminId,
      useYn: dto.useYn,
    });
  }
}
