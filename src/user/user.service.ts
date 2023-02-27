import { Injectable, NotFoundException } from '@nestjs/common';
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
    const result = this.userRepository.findAndCount({
      relations: ['trainer'],
      take: 10,
      skip: (dto.page - 1) * 10,
      order: { id: 'DESC' },
    });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async getDetail(id: number) {
    const result = this.userRepository.findOne({
      relations: ['trainer'],
      where: { id },
    });
    if (!result) {
      throw new NotFoundException();
    }

    return result;
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
    const user = await this.getDetail(id);
    this.userRepository.delete(user.id);
  }

  async update(dto: UpdateUser) {
    this.userRepository.update(dto.id, dto);
  }
}
