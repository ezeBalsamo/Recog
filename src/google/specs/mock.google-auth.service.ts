import { GoogleAuthServiceBehaviour } from '../google-auth.interface'
import { Profile } from 'passport-google-oauth20'

export class MockGoogleAuthService implements GoogleAuthServiceBehaviour {
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

  handleRedirectionFor(user: any): Promise<any> {
    return Promise.resolve({ ...user, token: '123abc' })
  }
}
