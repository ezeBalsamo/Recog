import { Profile, StrategyOptions } from 'passport-discord'

export interface DiscordProfile extends Omit<Profile, 'provider'> {
  provider: string
}
export interface DiscordAuthServiceBehaviour {
  handleLoginFor(
    accessToken: string,
    refreshToken: string,
    profile: DiscordProfile,
  ): Promise<any>

  handleRedirectionFor(user: any): Promise<any>
}

export interface DiscordAuthStrategyOptions extends StrategyOptions {
  callbackURL: string
  scope: string | string[]
}

export interface DiscordAuthServiceDefinition {
  imports?: any[]
  class: any
}

export interface DiscordAuthModuleOptions {
  strategyOptions: DiscordAuthStrategyOptions
  authServiceDefinition: DiscordAuthServiceDefinition
}
