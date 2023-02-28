import { Profile } from 'passport-github2'

export interface DiscordAuthServiceBehaviour {
  handleLoginFor(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any>
}
