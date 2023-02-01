import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { MODULE_OPTIONS_TOKEN } from './jwt-auth.module-definition'
import { JwtAuthModuleOptions } from './jwt-auth.interface'

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  private readonly handlePayload: (payload: unknown) => Promise<unknown>
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: JwtAuthModuleOptions,
  ) {
    super(options.strategyOptions)
    this.handlePayload = options.handlePayload
  }

  async validate(payload: unknown): Promise<unknown> {
    return this.handlePayload(payload)
  }
}
