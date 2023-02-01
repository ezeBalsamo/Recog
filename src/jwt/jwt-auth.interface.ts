import { JwtModuleOptions } from '@nestjs/jwt'
import { StrategyOptions } from 'passport-jwt'

export interface JwtAuthModuleOptions {
  moduleOptions?: JwtModuleOptions
  strategyOptions: StrategyOptions
  handlePayload: (payload: any) => Promise<unknown>
}
