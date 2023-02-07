import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { Inject, Injectable } from '@nestjs/common'
import {
  LocalAuthModuleOptions,
  LocalAuthServiceBehaviour,
} from './local-auth.interface'
import { MODULE_OPTIONS_TOKEN } from './local-auth.module-definition'

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  private authService: LocalAuthServiceBehaviour

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: LocalAuthModuleOptions,
  ) {
    super(options.strategyOptions || {})
    this.authService = options.authService
  }

  async validate(username: string, password: string): Promise<unknown> {
    return this.authService.validatedUserFrom(username, password)
  }
}
