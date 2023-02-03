import { GoogleAuthController } from '../google-auth.controller'
import { MockGoogleAuthService } from './mock.google-auth.service'

describe('GoogleAuthController', () => {
  it('should redirect on successful login', async () => {
    const controller = new GoogleAuthController({
      authService: new MockGoogleAuthService(),
    })
    const user = { name: 'Matt Murdock', email: 'mmurdock@gmail.com' }
    const expected = { ...user, token: '123abc' }
    await expect(controller.redirect({ user })).resolves.toEqual(expected)
  })
})
