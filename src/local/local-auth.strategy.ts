import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { Injectable } from '@nestjs/common'
import {
  LocalAuthModuleOptions,
  LocalAuthServiceBehaviour,
} from './local-auth.interface'

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  private authService: LocalAuthServiceBehaviour

  constructor(private readonly options: LocalAuthModuleOptions) {
    super(options.strategyOptions || {})
    this.authService = options.authService
  }

  async validate(username: string, password: string): Promise<unknown> {
    return this.authService.validatedUserFrom(username, password)
  }
}
