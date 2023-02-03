import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-google-oauth20'
import {
  GoogleAuthModuleOptions,
  GoogleAuthServiceBehaviour,
} from './google-auth.interface'

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy) {
  private readonly authService: GoogleAuthServiceBehaviour

  constructor(options: GoogleAuthModuleOptions) {
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
