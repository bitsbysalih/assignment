import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    example: 'Request for Access',
    description: 'Message Subject',
  })
  @IsString()
  subject: string;

  @ApiProperty({
    example: 'This is a message asking for request to a certain account',
    description: 'Message Content',
  })
  @IsString()
  content: string;
}
