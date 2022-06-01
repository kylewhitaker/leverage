import { AwsUser, User } from './interfaces';

export function mapUser(awsUser: AwsUser): User {
  const { sub: id, name, email } = awsUser.attributes;
  return { id, name, email };
}
