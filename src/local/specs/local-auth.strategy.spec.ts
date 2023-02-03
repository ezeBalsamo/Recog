import { LocalAuthStrategy } from '../local-auth.strategy'

describe('LocalAuthStrategy', () => {
  it('should succeed when provided credentials are valid', async () => {
    const strategy = new LocalAuthStrategy({
      handleLoginFor: user => Promise.resolve({ ...user, id: '1' }),
    })

    const user = {
      username: 'Clark Kent',
      password: 'iAmSuperman',
    }
    const expectedUser = { ...user, id: '1' }
    await expect(strategy.validate(user)).resolves.toEqual(expectedUser)
  })
})
