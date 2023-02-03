import { LocalAuthStrategy } from '../local-auth.strategy'

describe('LocalAuthStrategy', () => {
  it('should validate provided credentials', async () => {
    const strategy = new LocalAuthStrategy({
      handleLoginFor: (username, password) =>
        Promise.resolve({ username, password, id: '1' }),
    })

    const username = 'Clark Kent'
    const password = 'iAmSuperman'

    const expectedUser = { username, password, id: '1' }
    await expect(strategy.validate(username, password)).resolves.toEqual(
      expectedUser,
    )
  })
})
