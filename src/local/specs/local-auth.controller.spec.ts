import { LocalAuthController } from '../local-auth.controller'
import { MockLocalAuthService } from './mock-local-auth.service'

describe('LocalAuthController', () => {
  it('it should succeed when provided credentials are valid', async () => {
    const controller = new LocalAuthController(new MockLocalAuthService())
    const user = { username: 'Matt Murdock', password: 'mmurdock' }
    const request = { user }
    const expected = { username: user.username, token: '1234' }

    await expect(controller.login(request)).resolves.toEqual(expected)
  })
})
