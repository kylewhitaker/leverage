import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CognitoIdentityProviderClient,
  AdminUpdateUserAttributesCommand,
  AdminConfirmSignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  create(userDto: UserDto): Promise<User> {
    return this.userRepository.save(userDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  verifyEmail(userDto: UserDto): Promise<boolean> {
    const client = new CognitoIdentityProviderClient({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const verifyEmailCommand = new AdminUpdateUserAttributesCommand({
      UserPoolId: process.env.AWS_USER_POOL_ID,
      Username: userDto.email,
      UserAttributes: [
        {
          Name: 'email_verified',
          Value: 'true',
        },
      ],
    });
    const confirmUserCommand = new AdminConfirmSignUpCommand({
      UserPoolId: process.env.AWS_USER_POOL_ID,
      Username: userDto.email,
    });
    return Promise.all([client.send(verifyEmailCommand), client.send(confirmUserCommand)]).then(
      (result) => {
        console.log('success:', result);
        return true;
      },
      (err) => {
        console.log('error:', err);
        return false;
      }
    );
  }
}
