import axios from 'axios';
import { Contact } from './interfaces';

export abstract class ApiService {
  static getContacts = () =>
    axios.get<Contact[]>(`${process.env.REACT_APP_API_URL}/contacts`).then((response) => response.data);
}
