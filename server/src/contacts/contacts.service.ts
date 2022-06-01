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

  create(userId: string, contactDto: ContactDto): Promise<Contact> {
    return this.contactsRepository.save({ userId, ...contactDto });
  }

  findAll(userId: string): Promise<Contact[]> {
    return this.contactsRepository.find({
      where: { userId },
    });
  }

  delete(userId: string, id: string): Promise<any> {
    return this.contactsRepository.delete({ userId, id });
  }
}
