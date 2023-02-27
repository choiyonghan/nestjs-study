import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainer } from './entity/trainer.entity';
import { SearchTrainer } from './type/search-trainer.interface';
import { InsertTrainer } from './type/insert-trainer.interface';
import { UpdateTrainer } from './type/update-trainer.interface';

@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainer) private trainerRepository: Repository<Trainer>,
  ) {}

  async search(dto: SearchTrainer) {
    return this.trainerRepository.findAndCount({
      take: 10,
      skip: (dto.page - 1) * 10,
      order: { id: 'DESC' },
    });
  }

  async findAll() {
    return this.trainerRepository.find({ order: { id: 'desc' } });
  }

  async getDetail(id: number) {
    return this.trainerRepository.findOne({ where: { id } });
  }

  async save(dto: InsertTrainer) {
    const trainerEntity = this.trainerRepository.create();

    trainerEntity.adminId = dto.adminId;
    trainerEntity.adminName = dto.adminName;
    trainerEntity.joinDate = Number(dto.joinDate.replace(/\-/g, ''));
    trainerEntity.height = dto.height;
    trainerEntity.weight = dto.weight;
    trainerEntity.gender = dto.gender;
    trainerEntity.phone = dto.phone;
    trainerEntity.useYn = dto.useYn;
    this.trainerRepository.save(trainerEntity);
  }

  async delete(id: number) {
    this.trainerRepository.delete(id);
  }

  async update(dto: UpdateTrainer) {
    return this.trainerRepository.update(dto.id, dto);
  }
}
