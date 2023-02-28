import {
  DiscordAuthServiceBehaviour,
  DiscordProfile,
} from '../discord-auth.interface'

export class MockDiscordAuthService implements DiscordAuthServiceBehaviour {
  handleLoginFor(
    accessToken: string,
    refreshToken: string,
    profile: DiscordProfile,
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
