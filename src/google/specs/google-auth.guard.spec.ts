import { GoogleAuthGuard } from '../google-auth.guard'
import { createMock } from '@golevelup/ts-jest'
import { ExecutionContext } from '@nestjs/common'

describe('GoogleAuthGuard', () => {
  let googleAuthGuard: GoogleAuthGuard

  beforeEach(() => {
    googleAuthGuard = new GoogleAuthGuard()
  })

  it('should throw an error when there is no related strategy', async () => {
    const context = createMock<ExecutionContext>()
    await expect(googleAuthGuard.canActivate(context)).rejects.toThrow(
      'Unknown authentication strategy "google"',
    )
  })
})
