import { JwtAuthStrategy } from '../jwt-auth.strategy'
import { ExtractJwt } from 'passport-jwt'
import MockJwtAuthService from './mock.jwt-auth.service'

describe('JwtAuthStrategy', () => {
  it('should handle validated payload', async () => {
    const strategy = new JwtAuthStrategy(
      {
        secretOrKey: 'Clark Kent is Superman',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      new MockJwtAuthService(),
    )

    const payload = { name: 'Lex Luthor' }
    const expectedPayload = { ...payload, id: '1' }
    await expect(strategy.validate(payload)).resolves.toEqual(expectedPayload)
  })
})
