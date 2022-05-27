import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactDto } from './contact.dto';
import { Contact } from './contact.entity';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  findAll(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }

  @Post()
  create(@Body() contactDto: ContactDto): Promise<Contact> {
    return this.contactsService.create(contactDto);
  }
}
