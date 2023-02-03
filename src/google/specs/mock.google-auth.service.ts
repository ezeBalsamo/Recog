export class MockGoogleAuthService {
  handleLoginFor(
    accessToken: string,
    refreshToken: string,
    profile: object,
  ): Promise<any> {
    return Promise.resolve({ ...profile, id: '1' })
  }
}
