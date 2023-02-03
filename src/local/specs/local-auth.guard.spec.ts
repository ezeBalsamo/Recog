import { LocalAuthGuard } from '../local-auth.guard'
import { ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { createMock } from '@golevelup/ts-jest'
import { LocalAuthStrategy } from '../local-auth.strategy'

const injectStrategy = () =>
  new LocalAuthStrategy({
    handleLoginFor: (username, password) =>
      Promise.resolve({ username, password, id: '1' }),
  })

describe('LocalAuthGuard', () => {
  let localAuthGuard: LocalAuthGuard

  beforeEach(() => {
    localAuthGuard = new LocalAuthGuard()
  })

  it('should throw an error when there is no related strategy', async () => {
    const context = createMock<ExecutionContext>()
    await expect(localAuthGuard.canActivate(context)).rejects.toThrow(
      'Unknown authentication strategy "local"',
    )
  })

  it('should throw and Unauthorized error when username field and password field are undefined', async () => {
    injectStrategy()
    const context = createMock<ExecutionContext>()
    await expect(localAuthGuard.canActivate(context)).rejects.toEqual(
      new UnauthorizedException(),
    )
  })

  it('should throw Unauthorized error when username field is undefined', async () => {
    injectStrategy()
    const context = createMock<ExecutionContext>()
    context.switchToHttp().getRequest.mockReturnValue({
      body: {
        password: 'iAmSuperman',
      },
    })
    await expect(localAuthGuard.canActivate(context)).rejects.toEqual(
      new UnauthorizedException(),
    )
  })

  it('should throw Unauthorized error when password field is undefined', async () => {
    injectStrategy()
    const context = createMock<ExecutionContext>()
    context.switchToHttp().getRequest.mockReturnValue({
      body: {
        username: 'Clark Kent',
      },
    })
    await expect(localAuthGuard.canActivate(context)).rejects.toEqual(
      new UnauthorizedException(),
    )
  })
})
