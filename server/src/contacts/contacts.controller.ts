import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/core/auth.guard';
import { ContactDto } from './contact.dto';
import { Contact } from './contact.entity';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() contactDto: ContactDto): Promise<Contact> {
    return this.contactsService.create(contactDto);
  }
}
