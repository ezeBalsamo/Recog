import { Test } from '@nestjs/testing'
import { MockGoogleAuthService } from './mock.google-auth.service'
import { GoogleAuthModule } from '../google-auth.module'
import * as config from 'recog-config'
import { RecogConfig } from 'src/recog-config.interface'
import { RecogGoogleConfigAuthServiceDefinition } from '../google-config.interface'

jest.mock('recog-config', () => {
  return {
    __esModule: true,
    default: {
      google: {
        authServiceDefinition: {
          class: MockGoogleAuthService,
        },
        routes: {
          prefix: 'auth/google',
          loginPath: '/',
          redirectPath: 'callback',
        },
      },
    },
  }
})

const configureAuthServiceDefinitionWith = (
  definition: RecogGoogleConfigAuthServiceDefinition,
) => {
  const mockedConfig = config as { default: RecogConfig }
  const googleConfig = mockedConfig.default.google
  googleConfig.authServiceDefinition = definition
}

const configureExplicitImports = () => {
  configureAuthServiceDefinitionWith({
    imports: [],
    class: MockGoogleAuthService,
  })
}

const configureImplicitImports = () => {
  configureAuthServiceDefinitionWith({
    class: MockGoogleAuthService,
  })
}

describe('GoogleAuthModule', () => {
  it('can be registered', async () => {
    configureExplicitImports()
    const testingModule = await Test.createTestingModule({
      imports: [
        GoogleAuthModule.register({
          clientID: 'id1234',
          clientSecret: 'Matt Murdock is Daredevil',
          callbackURL: 'http://localhost:3000/auth/google/callback',
          scope: ['email', 'profile'],
        }),
      ],
    }).compile()
    const app = testingModule.createNestApplication()
    await app.init()
  })

  it('can be registered asynchronously', async () => {
    configureImplicitImports()
    const testingModule = await Test.createTestingModule({
      imports: [
        GoogleAuthModule.registerAsync({
          useFactory: () => ({
            clientID: 'id1234',
            clientSecret: 'Matt Murdock is Daredevil',
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['email', 'profile'],
          }),
        }),
      ],
    }).compile()
    const app = testingModule.createNestApplication()
    await app.init()
  })
})
