import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InsertTrainerDto {
  @IsNotEmpty()
  @IsString()
  adminId: string;

  @IsNotEmpty()
  @IsString()
  adminName: string;

  @IsNotEmpty()
  @IsString()
  joinDate: string;

  @IsNotEmpty()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNotEmpty()
  @IsString()
  useYn: string;
}
