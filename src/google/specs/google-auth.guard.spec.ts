import { GoogleAuthGuard } from '../google-auth.guard'
import { createMock } from '@golevelup/ts-jest'
import { ExecutionContext } from '@nestjs/common'

describe('GoogleAuthGuard', () => {
  it('should throw an error when there is no related strategy', async () => {
    const googleAuthGuard = new GoogleAuthGuard()
    const context = createMock<ExecutionContext>()
    await expect(googleAuthGuard.canActivate(context)).rejects.toThrow(
      'Unknown authentication strategy "google"',
    )
  })
})
