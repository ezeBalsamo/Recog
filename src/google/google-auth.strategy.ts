import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-google-oauth20'
import {
  GoogleAuthServiceBehaviour,
  GoogleAuthStrategyOptions,
} from './google-auth.interface'
import {
  GOOGLE_AUTH_SERVICE,
  GOOGLE_AUTH_STRATEGY_OPTIONS,
} from './google-auth.constants'

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(GOOGLE_AUTH_SERVICE)
    private readonly authService: GoogleAuthServiceBehaviour,
    @Inject(GOOGLE_AUTH_STRATEGY_OPTIONS)
    private readonly options: GoogleAuthStrategyOptions,
  ) {
    super(options)
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    return this.authService.handleLoginFor(accessToken, refreshToken, profile)
  }
}
