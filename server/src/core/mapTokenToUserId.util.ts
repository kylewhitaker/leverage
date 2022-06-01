import { decode, Jwt } from 'jsonwebtoken';

export function mapTokenToUserId(token: string): string {
  const decodedToken: Jwt = decode(token, { complete: true });
  return decodedToken.payload.sub as string;
}
