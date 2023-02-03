import { Test } from '@nestjs/testing'
import { GoogleAuthModule } from '../google-auth.module'
import { MockGoogleAuthService } from './mock.google-auth.service'

describe('GoogleAuthModule', () => {
  it('can be registered', async () => {
    const testingModule = await Test.createTestingModule({
      imports: [
        GoogleAuthModule.register({
          strategyOptions: {
            clientID: 'id1234',
            clientSecret: 'Matt Murdock is Daredevil',
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['email', 'profile'],
          },
          authService: new MockGoogleAuthService(),
        }),
      ],
    }).compile()
    const app = testingModule.createNestApplication()
    await app.init()
  })
})
