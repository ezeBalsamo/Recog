import { GoogleAuthStrategy } from '../google-auth.strategy'
import { MockGoogleAuthService } from './mock.google-auth.service'

describe('GoogleAuthStrategy', () => {
  it('should validate provided credentials', async () => {
    const strategy = new GoogleAuthStrategy({
      strategyOptions: {
        clientID: 'id1234',
        clientSecret: 'Matt Murdock is Daredevil',
        callbackURL: 'http://localhost:3000/auth/google/callback',
        scope: ['email', 'profile'],
      },
      authService: new MockGoogleAuthService(),
    })

    const accessToken = 'abc'
    const refreshToken = 'xyz'
    const profile = {
      displayName: 'Clark Kent',
      userId: '12345',
    }

    const expected = { ...profile, id: '1' }

    await expect(
      strategy.validate(accessToken, refreshToken, profile),
    ).resolves.toEqual(expected)
  })
})
