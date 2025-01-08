import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from '../iam.constants';
import { IActiveUserData } from '../interfaces/active-user-data.interface';

export const ActiveUser = createParamDecorator(
  (field: keyof IActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: IActiveUserData = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);
