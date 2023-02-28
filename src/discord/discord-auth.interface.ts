import { StrategyOptions } from 'passport-discord'

export interface DiscordAuthServiceBehaviour {
  handleLoginFor(
    accessToken: string,
    refreshToken: string,
    profile: {
      displayName: string
      flags: number
      verified: boolean
      banner: string
      fetchedAt: string
      avatar: string
      locale: string
      discriminator: string
      accent_color: number
      provider: string
      mfa_enabled: boolean
      id: string
      email: string
      username: string
    },
  ): Promise<any>
}

export interface DiscordAuthStrategyOptions extends StrategyOptions {
  callbackURL: string
}
