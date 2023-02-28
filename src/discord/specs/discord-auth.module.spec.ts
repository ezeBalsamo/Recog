import { Test } from '@nestjs/testing'
import { DiscordAuthServiceDefinition } from '../discord-auth.interface'
import { DiscordAuthModule } from '../discord-auth.module'
import { MockDiscordAuthService } from './mock.discord-auth.service'

const assertCanInitializeWhenAuthServiceDefinedBy = async (
  authServiceDefinition: DiscordAuthServiceDefinition,
) => {
  const testingModule = await Test.createTestingModule({
    imports: [
      DiscordAuthModule.register({
        strategyOptions: {
          clientID: 'pennyworth1',
          clientSecret: 'Bruce Wayne is Batman',
          callbackURL: 'http://localhost:3000/auth/discord/callback',
          scope: ['identify', 'email'],
        },
        authServiceDefinition,
      }),
    ],
  }).compile()
  const app = testingModule.createNestApplication()
  await app.init()
}

describe('DiscordAuthModule', () => {
  it('can be registered with implicit auth service definition imports', async () => {
    await assertCanInitializeWhenAuthServiceDefinedBy({
      class: MockDiscordAuthService,
    })
  })

  it('can be registered with explicit auth service definition imports', async () => {
    await assertCanInitializeWhenAuthServiceDefinedBy({
      imports: [],
      class: MockDiscordAuthService,
    })
  })
})
