import { Test } from '@nestjs/testing'
import { MockGoogleAuthService } from './mock.google-auth.service'
import { GoogleAuthModule } from '../google-auth.module'
import { GoogleAuthServiceDefinition } from '../google-auth.interface'

const assertCanInitializeWhenAuthServiceIsDefinedBy = async (
  authServiceDefinition: GoogleAuthServiceDefinition,
) => {
  const testingModule = await Test.createTestingModule({
    imports: [
      GoogleAuthModule.register({
        strategyOptions: {
          clientID: 'id1234',
          clientSecret: 'Matt Murdock is Daredevil',
          callbackURL: 'http://localhost:3000/auth/google/callback',
          scope: ['email', 'profile'],
        },
        authServiceDefinition,
      }),
    ],
  }).compile()
  const app = testingModule.createNestApplication()
  await app.init()
}

describe('GoogleAuthModule', () => {
  it('can be registered with implicit auth service definition imports', async () => {
    await assertCanInitializeWhenAuthServiceIsDefinedBy({
      class: MockGoogleAuthService,
    })
  })

  it('can be registered with explicit auth service definition imports', async () => {
    await assertCanInitializeWhenAuthServiceIsDefinedBy({
      imports: [],
      class: MockGoogleAuthService,
    })
  })
})
