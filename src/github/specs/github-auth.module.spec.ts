import { MockGithubAuthService } from './mock.github-auth.service'
import { GithubAuthServiceDefinition } from '../github-auth.interface'
import { GithubAuthModule } from '../github-auth.module'
import { Test } from '@nestjs/testing'

const assertCanInitialiseWhenAuthServiceDefinedBy = async (
  authServiceDefinition: GithubAuthServiceDefinition,
) => {
  const testingModule = await Test.createTestingModule({
    imports: [
      GithubAuthModule.register({
        strategyOptions: {
          clientID: 'pennyworth1',
          clientSecret: 'Bruce Wayne is Batman',
          callbackURL: 'http://localhost:3000/auth/github/callback',
        },
        authServiceDefinition,
      }),
    ],
  }).compile()
  const app = testingModule.createNestApplication()
  await app.init()
}

describe('GithubAuthModule', () => {
  it('can be registered with implicit auth service definition imports', async () => {
    await assertCanInitialiseWhenAuthServiceDefinedBy({
      class: MockGithubAuthService,
    })
  })

  it('can be registered with explicit auth service definition imports', async () => {
    await assertCanInitialiseWhenAuthServiceDefinedBy({
      imports: [],
      class: MockGithubAuthService,
    })
  })
})
