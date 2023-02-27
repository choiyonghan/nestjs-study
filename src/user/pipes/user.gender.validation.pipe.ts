import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class UserGenderValidationPipe implements PipeTransform {
  readonly GenderOptions = ['M', 'F'];
  transform(value: any, metadata: ArgumentMetadata): any {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the gender option`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.GenderOptions.indexOf(status);
    return index !== -1;
  }
}
