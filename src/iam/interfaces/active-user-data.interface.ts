import { Role } from 'src/users/enums/role.enum';

export interface IActiveUserData {
  sub: number;
  email: string;
  role: Role;
}
