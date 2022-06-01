import { decode, Jwt, verify, VerifyOptions } from 'jsonwebtoken';
import * as JwksRsa from 'jwks-rsa';

export const validateToken = (token: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const decodedToken: Jwt | null = decode(token, { complete: true });
    if (!decodedToken) resolve(false);

    const issuer = `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_USER_POOL_ID}`;
    const jwksClient = JwksRsa({
      jwksUri: `${issuer}/.well-known/jwks.json`,
      cache: true,
    });

    jwksClient.getSigningKey(decodedToken.header.kid, (error, key) => {
      if (error) return resolve(false);
      const options: VerifyOptions = {
        algorithms: [key.alg as any],
        ignoreExpiration: false,
        issuer,
      };
      verify(token, key.getPublicKey(), options, (error) => resolve(!error));
    });
  });
};
