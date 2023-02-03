import { LocalAuthGuard } from '../local-auth.guard'
import { ExecutionContext } from '@nestjs/common'
import { createMock } from '@golevelup/ts-jest'

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
})
