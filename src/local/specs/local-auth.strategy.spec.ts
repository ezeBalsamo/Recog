import { LocalAuthStrategy } from '../local-auth.strategy'
import { MockLocalAuthService } from './mock-local-auth.service'

describe('LocalAuthStrategy', () => {
  it('should validate provided credentials', async () => {
    const strategy = new LocalAuthStrategy(new MockLocalAuthService())

    const username = 'Clark Kent'
    const password = 'iAmSuperman'

    const expectedUser = { username, password, id: '1' }
    await expect(strategy.validate(username, password)).resolves.toEqual(
      expectedUser,
    )
  })
})
