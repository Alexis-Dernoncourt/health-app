import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginDto {
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
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password!: string;
}
