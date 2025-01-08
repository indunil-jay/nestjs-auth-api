import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enums/role.enum';
import {
  Permission,
  PermissionType,
} from 'src/iam/authorization/permission.type';
import { ApiKey } from '../api-keys/entities/api-key.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({})
  password: string;

  @Column({ enum: Role, default: Role.Regular })
  role: Role;

  /** having role and permisions colums combined together does not make sense . use one approach application needed. realworld secanrio it can have dedicated permision table for each resource. M:M relations*/
  @Column({ enum: Permission, default: [], type: 'json' })
  permissions: PermissionType[];

  @JoinTable()
  @OneToMany(() => ApiKey, (apikey) => apikey.user)
  apiKeys?: ApiKey[];
}
