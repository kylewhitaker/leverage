import { Auth } from 'aws-amplify';
import axios from 'axios';
import { Contact } from './interfaces';

export abstract class ApiService {
  static addContact = async (contact: Contact) =>
    axios
      .post<Contact>(`${process.env.REACT_APP_API_URL}/contacts`, contact, await setConfig())
      .then((response) => response.data);

  static getContacts = async () =>
    axios
      .get<Contact[]>(`${process.env.REACT_APP_API_URL}/contacts`, await setConfig())
      .then((response) => response.data);

  static deleteContact = async (id: string) =>
    axios
      .delete<Contact>(`${process.env.REACT_APP_API_URL}/contacts/${id}`, await setConfig())
      .then((response) => response.data);
}

async function setConfig() {
  return {
    headers: {
      Authorization: await Auth.currentSession().then((session) => session.getAccessToken().getJwtToken()),
    },
  };
}
