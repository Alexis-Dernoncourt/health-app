import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as cuid from 'cuid';

@Injectable()
export class ParseCUIDPipe implements PipeTransform<string> {
  transform(value: string): string {
    if (!cuid.isCuid(value)) {
      throw new BadRequestException('Invalid CUID');
    }
    return value;
  }
}
