import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class SigninDto {
  @ApiProperty({ required: true })
  @IsString({ message: 'firstname must be a string' })
  @Length(1, 128)
  firstname?: string;

  @ApiProperty({ nullable: true, required: false })
  @IsOptional()
  @IsString({ message: 'lastname must be a string' })
  @Length(1, 128)
  lastname?: string;

  @ApiProperty({
    required: true,
    example: 'exemple@mail.com',
    description: 'Email address',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    required: true,
    example: 'P@ssw0rd',
    description:
      'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.',
  })
  @IsString({ message: 'password must be a string' })
  @Length(8, 128)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password!: string;
}
