import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './authentication/guards/access-token/access-token.guard';
import { AuthenticationGuard } from './authentication/guards/authentication/authentication.guard';
import { RefreshTokenIdsStorage } from './authentication/refresh-token-ids.storage/refresh-token-ids.storage';
import { RefreshToken } from './authentication/entities/refresh-token.entity';
import { RolesGuard } from './authorization/guards/roles/roles.guard';
import { PermissionsGuard } from './authorization/guards/permissions/permissions.guard';

import { PolicyHandlerStorage } from './authorization/policies/policy-handlers.storage';
import { FrameworkContributorPolicyHanlder } from './authorization/policies/framework-contributor.policy';
import { PoliciesGuard } from './authorization/guards/policies/policies.guard';

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AuthenticationService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
      //RolesGuard,
      //   PermissionsGuard, ,
    },
    AccessTokenGuard,
    RefreshTokenIdsStorage,
    FrameworkContributorPolicyHanlder,
    PolicyHandlerStorage,
  ],
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
