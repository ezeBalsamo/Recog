import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-google-oauth20'
import {
  GoogleAuthModuleOptions,
  GoogleAuthServiceBehaviour,
} from './google-auth.interface'
import { MODULE_OPTIONS_TOKEN } from './google-auth.module-definition'

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy) {
  private readonly authService: GoogleAuthServiceBehaviour

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: GoogleAuthModuleOptions,
  ) {
    super(options.strategyOptions)
    this.authService = options.authService
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: object,
  ): Promise<any> {
    return this.authService.handleLoginFor(accessToken, refreshToken, profile)
  }
}
