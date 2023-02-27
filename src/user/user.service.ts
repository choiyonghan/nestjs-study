import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UpdateUser } from './types/update-user.interface';
import { SearchUser } from './types/search-user.interface';
import { InsertUser } from './types/insert-user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async search(dto: SearchUser) {
    return this.userRepository.findAndCount({
      relations: ['trainer'],
      take: 10,
      skip: (dto.page - 1) * 10,
      order: { id: 'DESC' },
    });
  }

  async getDetail(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async save(dto: InsertUser) {
    const userEntity = this.userRepository.create();

    userEntity.firstName = dto.firstName;
    userEntity.lastName = dto.lastName;
    userEntity.birthday = Number(dto.birthday.replace(/\-/g, ''));
    userEntity.height = dto.height;
    userEntity.weight = dto.weight;
    userEntity.gender = dto.gender;
    userEntity.address = dto.address;
    userEntity.phone = dto.phone;
    userEntity.useYn = dto.useYn;

    if (dto.adminId) {
      userEntity.adminId = dto.adminId;
    }

    this.userRepository.save(userEntity);
  }

  async delete(id: number) {
    this.userRepository.delete(id);
  }

  async update(dto: UpdateUser) {
    return this.userRepository.update(dto.id, dto);
  }
}
