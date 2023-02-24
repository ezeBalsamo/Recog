import { GithubAuthStrategy } from '../github-auth.strategy'
import { MockGithubAuthService } from './mock.github-auth.service'

describe('GithubAuthStrategy', () => {
  it('should validate provided credentials', async () => {
    const strategy = new GithubAuthStrategy(new MockGithubAuthService(), {
      clientID: 'pennyworth1',
      clientSecret: 'Bruce Wayne is Batman',
      callbackURL: 'http://localhost:3000/auth/github/callback',
    })

    const accessToken = '123'
    const refreshToken = 'abc'
    const profile = {
      displayName: 'Bruce Wayne',
      profileUrl:
        'https://hips.hearstapps.com/es.h-cdn.co/fotoes/images/actualidad/christian-bale-no-sera-batman-en-justice-league/6640180-4-esl-ES/Christian-Bale-no-sera-Batman-en-Justice-League.jpg?resize=480:*',
      id: '10769150350006150715113082367',
      provider: '',
    }

    const { displayName, id } = profile
    const expected = { displayName, id, superhero: true }

    await expect(
      strategy.validate(accessToken, refreshToken, profile),
    ).resolves.toEqual(expected)
  })
})
