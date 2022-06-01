import { Auth } from 'aws-amplify';
import axios from 'axios';
import { Contact } from './interfaces';

export abstract class ApiService {
  static getContacts = async () =>
    axios
      .get<Contact[]>(`${process.env.REACT_APP_API_URL}/contacts`, {
        headers: {
          Authorization: await Auth.currentSession().then((session) => session.getAccessToken().getJwtToken()),
        },
      })
      .then((response) => response.data);
}
