import { DiscordAuthController } from '../discord-auth.controller'
import { MockDiscordAuthService } from './mock.discord-auth.service'

describe('DiscordAuthController', () => {
  it('should redirect on successful login', async () => {
    const controller = new DiscordAuthController(new MockDiscordAuthService())
    const user = { name: 'Bruce Wayne', email: 'iamnotbatman@gmail.com' }
    const expected = { ...user, token: '1234' }

    await controller.login() // We 'mock' a successful login
    await expect(controller.redirect({ user })).resolves.toEqual(expected)
  })
})
