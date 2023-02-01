import { JwtAuthGuard } from './jwt-auth.guard'
import { ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { createMock } from '@golevelup/ts-jest'
import { JwtAuthStrategy } from './jwt-auth.strategy'
import { sign } from 'jsonwebtoken'
import { ExtractJwt } from 'passport-jwt'

const injectStrategySecuredBy = (secret: string) =>
  new JwtAuthStrategy({
    strategyOptions: {
      secretOrKey: secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    handlePayload: payload => Promise.resolve(payload),
  })
const injectStrategy = () => injectStrategySecuredBy('secret')

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard

  beforeEach(() => {
    jwtAuthGuard = new JwtAuthGuard()
  })

  it('should throw an error when there is no related strategy', async () => {
    const context = createMock<ExecutionContext>()
    await expect(jwtAuthGuard.canActivate(context)).rejects.toThrow(
      'Unknown authentication strategy "jwt"',
    )
  })

  it('should throw an Unauthorized (HTTP 401) error when jwt is absent', async () => {
    injectStrategy()
    const context = createMock<ExecutionContext>()
    await expect(() => jwtAuthGuard.canActivate(context)).rejects.toEqual(
      new UnauthorizedException(),
    )
  })

  it('should throw an Unauthorized (HTTP 401) error when jwt is invalid', async () => {
    injectStrategy()
    const context = createMock<ExecutionContext>()
    context.switchToHttp().getRequest.mockReturnValue({
      headers: {
        authorization: 'Bearer invalidJwt',
      },
    })
    await expect(() => jwtAuthGuard.canActivate(context)).rejects.toEqual(
      new UnauthorizedException(),
    )
  })

  it('should succeed when jwt is valid', async () => {
    const secret = 'Clark Kent is Superman'
    injectStrategySecuredBy(secret)
    const validJwt = sign('payload!', secret)
    const context = createMock<ExecutionContext>()
    context.switchToHttp().getRequest.mockReturnValue({
      headers: {
        authorization: `Bearer ${validJwt}`,
      },
    })
    await expect(jwtAuthGuard.canActivate(context)).resolves.toBeTruthy()
  })
})
