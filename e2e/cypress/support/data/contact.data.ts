import { Contact } from '../interfaces';

export const getContact = (data: Partial<Contact> = {}): Contact => {
  const dateId = Date.now();
  return {
    name: `Contact ${dateId}`,
    email: `contact${dateId}@test.com`,
    phone: '5557891234',
    ...data,
  };
};
