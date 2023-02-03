import { StrategyOptions } from 'passport-google-oauth20'

export interface GoogleAuthServiceBehaviour {
  handleLoginFor(
    accessToken: string,
    refreshToken: string,
    profile: object,
  ): Promise<any>

  handleRedirectionFor(user: any): Promise<any>
}

export interface GoogleAuthModuleOptions {
  strategyOptions?: StrategyOptions
  authService: GoogleAuthServiceBehaviour
}
