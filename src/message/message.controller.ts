import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  // ApiBearerAuth,
  //   ApiHeader,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({
    summary: 'Creates a new message in Database',
  })
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieves all messages in database',
  })
  async findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieves a single message based on id',
  })
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }
}
