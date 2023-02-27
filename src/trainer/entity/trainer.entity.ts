import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  adminId: string;

  @Column()
  adminName: string;

  @Column()
  joinDate: number;

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column()
  gender: string;

  @Column()
  phone: number;

  @Column()
  useYn: string;

  @Expose()
  get joinDateToString(): string {
    return `${this.joinDate.toString().substring(0, 4)}-${this.joinDate
      .toString()
      .substring(4, 6)}-${this.joinDate.toString().substring(6, 8)}`;
  }

  @Expose()
  get genderToString(): string {
    return this.gender == 'M' ? '남성' : '여성';
  }

  @Expose()
  get phoneToString(): string {
    return `0${this.phone.toString().substring(0, 2)}-${this.phone
      .toString()
      .substring(2, 6)}-${this.phone.toString().substring(6, 10)}`;
  }

  @OneToMany(() => User, (user) => user.trainer)
  user: User;
}
