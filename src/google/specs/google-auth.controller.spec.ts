import { GoogleAuthController } from '../google-auth.controller'
import { MockGoogleAuthService } from './mock.google-auth.service'

describe('GoogleAuthController', () => {
  it('should redirect on successful login', async () => {
    const controller = new GoogleAuthController(new MockGoogleAuthService())
    const user = { name: 'Matt Murdock', email: 'mmurdock@gmail.com' }
    const expected = { ...user, token: '123abc' }

    await controller.login() // We 'mock' a successful login
    await expect(controller.redirect({ user })).resolves.toEqual(expected)
  })
})
