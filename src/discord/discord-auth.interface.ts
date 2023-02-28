import { Profile } from 'passport-github2'
import { StrategyOptions } from 'passport-discord'

export interface DiscordAuthServiceBehaviour {
  handleLoginFor(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any>
}

export interface DiscordAuthStrategyOptions extends StrategyOptions {
  callbackURL: string
}
