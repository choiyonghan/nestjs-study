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
import { TrainerService } from './trainer.service';
import { SearchTrainerDto } from './dto/search-trainer.dto';
import { InsertTrainerDto } from './dto/insert-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Controller('trainer')
export class TrainerController {
  constructor(private trainerService: TrainerService) {}

  @Get()
  @Render('trainer/index')
  @UsePipes(ValidationPipe)
  async index(@Query() dto: SearchTrainerDto) {
    const [result, total] = await this.trainerService.search(dto);
    return {
      trainers: result,
      total: total,
      currentPage: dto.page,
    };
  }

  @Get('/empty')
  @Render('trainer/save')
  async getInitDetail() {
    return;
  }

  @Post()
  @Redirect('/trainer')
  @UsePipes(ValidationPipe)
  async save(@Body() dto: InsertTrainerDto) {
    await this.trainerService.save(dto);
  }

  @Delete(':id')
  @Redirect('/trainer')
  async delete(@Param('id') id: number) {
    await this.trainerService.delete(id);
  }

  @Get('edit/:id')
  @Render('trainer/edit')
  async editView(@Param('id') id: number) {
    return {
      trainer: await this.trainerService.getDetail(id),
    };
  }

  @Put(':id')
  @Redirect('/trainer')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: number, @Body() dto: UpdateTrainerDto) {
    await this.trainerService.update({
      id,
      adminId: dto.adminId,
      adminName: dto.adminName,
      joinDate: Number(dto.joinDate.replace(/\-/g, '')),
      height: dto.height,
      weight: dto.weight,
      gender: dto.gender,
      phone: dto.phone,
      useYn: dto.useYn,
    });
  }
}
