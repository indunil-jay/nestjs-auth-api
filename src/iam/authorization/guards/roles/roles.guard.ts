import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from 'src/users/enums/role.enum';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { IActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const contextRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!contextRoles) return true;

    const user: IActiveUserData = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];

    return contextRoles.some((role) => user.role === role);
  }
}
