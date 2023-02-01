import { Test } from '@nestjs/testing'
import { JwtAuthModule } from '../jwt-auth.module'
import { ExtractJwt } from 'passport-jwt'

describe('JwtAuthModule', () => {
  it('must include JwtModule options', () => {
    const incompleteModuleOptions = {
      strategyOptions: {
        secretOrKey: 'Clark Kent is Superman',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      handlePayload: payload => Promise.resolve(payload),
    }
    expect(() => JwtAuthModule.register(incompleteModuleOptions)).toThrow(
      new Error('Jwt Module options must be provided.'),
    )
  })

  it('can be registered', async () => {
    const testingModule = await Test.createTestingModule({
      imports: [
        JwtAuthModule.register({
          moduleOptions: {
            secret: 'Clark Kent is Superman',
          },
          strategyOptions: {
            secretOrKey: 'Clark Kent is Superman',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          },
          handlePayload: payload => Promise.resolve(payload),
        }),
      ],
    }).compile()
    const app = testingModule.createNestApplication()
    await app.init()
  })
})
