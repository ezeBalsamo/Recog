import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { Inject, Injectable } from '@nestjs/common'
import {
  LocalAuthServiceBehaviour,
  LocalAuthStrategyOptions,
} from './local-auth.interface'
import {
  LOCAL_AUTH_SERVICE,
  LOCAL_AUTH_STRATEGY_OPTIONS,
} from './local-auth.constants'

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(LOCAL_AUTH_SERVICE)
    private readonly authService: LocalAuthServiceBehaviour,
    @Inject(LOCAL_AUTH_STRATEGY_OPTIONS)
    private readonly options: LocalAuthStrategyOptions,
  ) {
    super(options)
  }

  async validate(username: string, password: string): Promise<unknown> {
    return this.authService.validatedUserFrom(username, password)
  }
}
