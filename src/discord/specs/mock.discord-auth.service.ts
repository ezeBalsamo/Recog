import { DiscordAuthServiceBehaviour } from '../discord-auth.interface'

export class MockDiscordAuthService implements DiscordAuthServiceBehaviour {
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
  ): Promise<any> {
    return Promise.resolve({
      username: profile.username,
      id: profile.id,
      superhero: true,
    })
  }

  handleRedirectionFor(user: any): Promise<any> {
    return Promise.resolve({ ...user, token: '1234' })
  }
}
