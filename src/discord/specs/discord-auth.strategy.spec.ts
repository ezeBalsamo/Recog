import { DiscordAuthStrategy } from '../discord-auth.strategy'
import { MockDiscordAuthService } from './mock.discord-auth.service'

describe('DiscordAuthStrategy', () => {
  it('should validate provided credentials', async () => {
    const strategy = new DiscordAuthStrategy(new MockDiscordAuthService(), {
      clientID: 'pennyworth1',
      clientSecret: 'Bruce Wayne is Batman',
      callbackURL: 'http://localhost:3000/auth/discord/callback',
      scope: ['identify', 'email'],
    })

    const accessToken = '123'
    const refreshToken = 'abc'
    const profile = {
      provider: 'discord',
      username: 'BruceWayne',
      avatar: '8342729096ea3675442027381ff50dfe',
      locale: 'es-ES',
      mfa_enabled: false,
      flags: 64,
      banner: '06c16474723fe537c283b8efa61a30c8',
      accent_color: 16711680,
      discriminator: '0138',
      verified: true,
      fetchedAt: '',
      id: '80351110224678912',
      displayName: 'Bruce Wayne #0138',
      email: 'bruce_wayne@gmail.com',
    }

    const { username, id } = profile
    const expected = { username, id, superhero: true }

    await expect(
      strategy.validate(accessToken, refreshToken, profile),
    ).resolves.toEqual(expected)
  })
})
