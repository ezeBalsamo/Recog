import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-google-oauth20'
import { GoogleAuthModuleOptions } from './google-auth.interface'

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy) {
  private readonly handleLoginFor: (
    accessToken: string,
    refreshToken: string,
    profile: object,
  ) => Promise<any>

  constructor(options: GoogleAuthModuleOptions) {
    super(options.strategyOptions)
    this.handleLoginFor = options.handleLoginFor
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: object,
  ): Promise<any> {
    return this.handleLoginFor(accessToken, refreshToken, profile)
  }
}
