import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTrainerDto {
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
  height: number;

  @IsNotEmpty()
  weight: number;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  phone: number;

  @IsNotEmpty()
  @IsString()
  useYn: string;
}
