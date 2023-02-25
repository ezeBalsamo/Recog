import { GithubAuthController } from '../github-auth.controller'
import { MockGithubAuthService } from './mock.github-auth.service'

describe('GithubAuthController', () => {
  it('should redirect on successful login', async () => {
    const controller = new GithubAuthController(new MockGithubAuthService())
    const user = { name: 'Bruce Wayne', email: 'iamnotbatman@gmail.com' }
    const expected = { ...user, token: '1234' }

    await controller.login()
    await expect(controller.redirect({ user })).resolves.toEqual(expected)
  })
})
