import { GithubAuthServiceBehaviour } from '../github-auth.interface'
import { Profile } from 'passport-github2'

export class MockGithubAuthService implements GithubAuthServiceBehaviour {
  handleLoginFor(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    return Promise.resolve({
      id: profile.id,
      displayName: profile.displayName,
      superhero: true,
    })
  }

  handleRedirectFor(user: any): Promise<any> {
    return Promise.resolve({ ...user, token: '1234' })
  }
}
