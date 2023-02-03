import { StrategyOptions } from 'passport-google-oauth20'

export interface GoogleAuthModuleOptions {
  strategyOptions: StrategyOptions
  handleLoginFor: (
    accessToken: string,
    refreshToken: string,
    profile: object,
  ) => Promise<any>
}
