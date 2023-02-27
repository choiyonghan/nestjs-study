import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InsertUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  birthday: string;

  @IsNotEmpty()
  height: number;

  @IsNotEmpty()
  weight: number;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  phone: number;

  @IsString()
  adminId?: string;

  @IsNotEmpty()
  @IsString()
  useYn: string;
}
