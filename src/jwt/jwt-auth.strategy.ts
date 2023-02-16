import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, StrategyOptions } from 'passport-jwt'
import { JWT_STRATEGY_OPTIONS } from './jwt-auth.constants'
import { JwtAuthService } from './jwt-auth.service'

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(JWT_STRATEGY_OPTIONS)
    private readonly options: StrategyOptions,
    private readonly authService: JwtAuthService,
  ) {
    super(options)
  }

  async validate(payload: any): Promise<any> {
    return this.authService.handlePayload(payload)
  }
}
