import axios from 'axios';
import { Contact } from './interfaces';

export abstract class ApiService {
  static getContacts = () => axios.get<Contact[]>('http://localhost:2363/contacts').then((response) => response.data);
}
