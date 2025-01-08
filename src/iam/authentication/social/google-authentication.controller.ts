import { Auth } from '../decorators/auth.decorator';
import { GoogleTokenDto } from '../dto/google-token.dto';
import { AuthType } from '../enums/auth-type.enum';
import { GoogleAuthenticationService } from './google-authentication.service';
import { Body, Controller, Post } from '@nestjs/common';

@Auth(AuthType.None)
@Controller('authentication/google-authentication')
export class GoogleAuthenticationController {
  constructor(
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  @Post()
  public authenticate(@Body() tokenDto: GoogleTokenDto) {
    return this.googleAuthenticationService.authenticate(tokenDto.token);
  }
}
