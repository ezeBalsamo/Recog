import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt'
import { StrategyOptions } from 'passport-jwt'

export interface JwtAuthServiceProps {
  options: JwtModuleOptions
  handlePayload: (payload: any) => Promise<unknown>
}

export interface JwtAuthModuleOptions {
  moduleOptions: JwtModuleOptions
  strategyOptions: StrategyOptions
  handlePayload: (payload: any) => Promise<unknown>
}

export interface JwtAuthModuleAsyncOptions
  extends Omit<JwtModuleAsyncOptions, 'useFactory'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<JwtAuthModuleOptions> | JwtAuthModuleOptions
}
