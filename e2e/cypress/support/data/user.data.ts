import { User } from '../interfaces';

export const getUser = (data: Partial<User> = {}): User => {
  const dateId = Date.now();
  return {
    name: `Test Automation ${dateId}`,
    email: `automation${dateId}@test.com`,
    password: '@TestAutomation123',
    ...data,
  };
};
