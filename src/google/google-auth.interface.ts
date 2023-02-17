import { Profile, StrategyOptions } from 'passport-google-oauth20'

export interface GoogleAuthServiceBehaviour {
  handleLoginFor(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any>

  handleRedirectionFor(user: any): Promise<any>
}

export interface GoogleAuthStrategyOptions extends StrategyOptions {
  callbackURL: string
  scope: string | string[]
}

export interface GoogleAuthServiceDefinition {
  imports?: any[]
  class: any
}

export interface GoogleAuthModuleOptions {
  strategyOptions: GoogleAuthStrategyOptions
  authServiceDefinition: GoogleAuthServiceDefinition
}
