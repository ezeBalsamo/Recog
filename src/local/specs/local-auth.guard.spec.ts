import { LocalAuthGuard } from '../local-auth.guard'
import { ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { createMock } from '@golevelup/ts-jest'
import { LocalAuthStrategy } from '../local-auth.strategy'
import { MockLocalAuthService } from './mock-local-auth.service'

const injectStrategy = () =>
  new LocalAuthStrategy({
    authService: new MockLocalAuthService(),
  })

const injectCustomizedUsernameStrategy = () =>
  new LocalAuthStrategy({
    strategyOptions: {
      usernameField: 'mail',
    },
    authService: new MockLocalAuthService(),
  })

const injectCustomizedPasswordStrategy = () =>
  new LocalAuthStrategy({
    strategyOptions: {
      passwordField: 'pass',
    },
    authService: new MockLocalAuthService(),
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

  it('should throw an Unauthorized (HTTP 401) error when username and password fields are undefined', async () => {
    injectStrategy()
    const context = createMock<ExecutionContext>()
    await expect(localAuthGuard.canActivate(context)).rejects.toEqual(
      new UnauthorizedException(),
    )
  })

  it('should throw Unauthorized error when username field is absent', async () => {
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

  it('should throw Unauthorized error when password field is absent', async () => {
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

  it('should succeed when username and password fields are defined in the body', async () => {
    injectStrategy()
    const context = createMock<ExecutionContext>()
    context.switchToHttp().getRequest.mockReturnValue({
      body: {
        username: 'Clark Kent',
        password: 'iAmSuperman',
      },
    })
    await expect(localAuthGuard.canActivate(context)).resolves.toBeTruthy()
  })

  it('should succeed when username and password fields are defined in the query', async () => {
    injectStrategy()
    const context = createMock<ExecutionContext>()
    context.switchToHttp().getRequest.mockReturnValue({
      query: {
        username: 'Superman',
        password: 'iAmClarkKent',
      },
    })
    await expect(localAuthGuard.canActivate(context)).resolves.toBeTruthy()
  })

  it('should succeed when username field is customized', async () => {
    injectCustomizedUsernameStrategy()
    const context = createMock<ExecutionContext>()
    context.switchToHttp().getRequest.mockReturnValue({
      body: {
        mail: 'clark_kent@dailybugle.com',
        password: 'iAmSuperman',
      },
    })
    await expect(localAuthGuard.canActivate(context)).resolves.toBeTruthy()
  })

  it('should succeed when password field is customized', async () => {
    injectCustomizedPasswordStrategy()
    const context = createMock<ExecutionContext>()
    context.switchToHttp().getRequest.mockReturnValue({
      body: {
        username: 'Clark Kent',
        pass: 'iAmSuperman',
      },
    })
    await expect(localAuthGuard.canActivate(context)).resolves.toBeTruthy()
  })
})
