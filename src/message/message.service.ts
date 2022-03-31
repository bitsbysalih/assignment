import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateMessageDto } from './dto/create-message.dto';
import { Message, MessageDocument } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    try {
      const newMessage = await this.messageModel.create({
        ...createMessageDto,
      });
      await newMessage.save();
      return { message: 'Message Created Successfully', newMessage };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const messages = await this.messageModel.find({});
      if (messages.length <= 0) {
        return { message: 'No messages were found', messages: [] };
      }
      let unreadTotal = 0;
      messages.filter((message) => {
        message.isRead === false && unreadTotal++;
      });

      return { messages, unread: unreadTotal };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    try {
      const message = await this.messageModel.findById(id);
      if (!message) {
        throw new NotFoundException("Message wasn't found or doesn't exist");
      }
      await message.updateOne({ isRead: true }, { new: true });
      return { message };
    } catch (error) {
      throw new Error(error);
    }
  }
}
