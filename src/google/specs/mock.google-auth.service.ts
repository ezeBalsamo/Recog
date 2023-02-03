import { GoogleAuthServiceBehaviour } from '../google-auth.interface'

export class MockGoogleAuthService implements GoogleAuthServiceBehaviour {
  handleLoginFor(
    accessToken: string,
    refreshToken: string,
    profile: object,
  ): Promise<any> {
    return Promise.resolve({ ...profile, id: '1' })
  }
}
