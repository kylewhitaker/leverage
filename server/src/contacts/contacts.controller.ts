import { Body, Controller, Get, Post, Headers, UseGuards, Delete, Param } from '@nestjs/common';
import { AuthGuard } from 'src/core/auth.guard';
import { mapTokenToUserId } from 'src/core/mapTokenToUserId.util';
import { ContactDto } from './contact.dto';
import { Contact } from './contact.entity';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Headers('authorization') token: string): Promise<Contact[]> {
    const userId = mapTokenToUserId(token);
    return this.contactsService.findAll(userId);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Headers('authorization') token: string, @Body() contactDto: ContactDto): Promise<Contact> {
    const userId = mapTokenToUserId(token);
    return this.contactsService.create(userId, contactDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Headers('authorization') token: string, @Param('id') id: string): Promise<Contact> {
    const userId = mapTokenToUserId(token);
    return this.contactsService.delete(userId, id);
  }
}
