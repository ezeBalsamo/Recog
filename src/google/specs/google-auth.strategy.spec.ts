import { GoogleAuthStrategy } from '../google-auth.strategy'

describe('GoogleAuthStrategy', () => {
  it('should validate provided credentials', async () => {
    const strategy = new GoogleAuthStrategy({
      strategyOptions: {
        clientID: 'id1234',
        clientSecret: 'Matt Murdock is Daredevil',
      },
      handleLoginFor: (accessToken, refreshToken, profile) =>
        Promise.resolve({ ...profile, id: '1' }),
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
