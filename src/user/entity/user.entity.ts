import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Trainer } from '../../trainer/entity/trainer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthday: number;

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column()
  gender: string;

  @Column()
  address: string;

  @Column()
  phone: number;

  @Column({ nullable: true })
  adminId: string;

  @Column()
  useYn: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Expose()
  get fullName(): string {
    return `${this.firstName}${this.lastName}`;
  }

  @Expose()
  get birthdayToString(): string {
    return `${this.birthday.toString().substring(0, 4)}-${this.birthday
      .toString()
      .substring(4, 6)}-${this.birthday.toString().substring(6, 8)}`;
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

  @ManyToOne(() => Trainer, (trainer) => trainer.user)
  @JoinColumn({
    name: 'adminId',
    referencedColumnName: 'adminId',
  })
  trainer: Trainer;
}
