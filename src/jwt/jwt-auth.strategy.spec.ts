import { JwtAuthStrategy } from './jwt-auth.strategy'
import { ExtractJwt } from 'passport-jwt'

describe('JwtAuthStrategy', () => {
  it('should handle validated payload', async () => {
    const strategy = new JwtAuthStrategy({
      strategyOptions: {
        secretOrKey: 'Clark Kent is Superman',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      handlePayload: payload => Promise.resolve({ ...payload, id: '1' }),
    })

    const payload = { name: 'Lex Luthor' }
    const expectedPayload = { ...payload, id: '1' }
    await expect(strategy.validate(payload)).resolves.toEqual(expectedPayload)
  })
})
