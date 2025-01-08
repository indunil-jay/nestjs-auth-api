import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { AuthenticationService } from '../authentication.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GoogleAuthenticationService {
  private oAuth2Client: OAuth2Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthenticationService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  public async onModuleInit() {
    const clientId = this.configService.get('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');

    this.oAuth2Client = new OAuth2Client(clientId, clientSecret);
  }

  async authenticate(token: string) {
    try {
      const loginTicket = await this.oAuth2Client.verifyIdToken({
        idToken: token,
      });
      const { email, sub: googleId } = loginTicket.getPayload();

      const user = await this.usersRepository.findOneBy({ googleId });

      if (user) {
        return await this.authService.generateTokens(user);
      } else {
        const newUser = await this.usersRepository.save({ email, googleId });
        return await this.authService.generateTokens(newUser);
      }
    } catch (error) {
      const pgUniqueViolationErrorCode = '23505';
      if (error.code == pgUniqueViolationErrorCode) {
        throw new ConflictException();
      }
      throw new UnauthorizedException(error.message);
    }
  }
}
