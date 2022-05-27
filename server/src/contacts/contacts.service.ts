import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactDto } from './contact.dto';
import { Contact } from './contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>
  ) {}

  create(contactDto: ContactDto): Promise<Contact> {
    return this.contactsRepository.save(contactDto);
  }

  findAll(): Promise<Contact[]> {
    return this.contactsRepository.find();
  }
}
