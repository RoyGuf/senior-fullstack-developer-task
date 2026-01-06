import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Request } from 'express';
import { User } from '../users/users.entity';
import { UserStatus } from 'src/users/user-status.enum';

interface RequestWithUser extends Request {
  user?: User;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const username = request.headers['token'] as string | undefined;

    if (!username) {
      throw new UnauthorizedException('Token header is missing');
    }

    const user = await this.usersService.findByUsername(username);

    console.log('User status:', user);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    console.log('User status:', user);

    if (user.status === UserStatus.DELETED) {
      throw new UnauthorizedException('User is deleted');
    }

    request.user = user;
    return true;
  }
}
