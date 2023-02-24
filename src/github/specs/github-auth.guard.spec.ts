import { GithubAuthGuard } from '../github-auth.guard'
import { createMock } from '@golevelup/ts-jest'
import { ExecutionContext } from '@nestjs/common'

describe('GithubAuthGuard', () => {
  let githubAuthGuard: GithubAuthGuard

  beforeEach(() => {
    githubAuthGuard = new GithubAuthGuard()
  })

  it('should throw an error when there is no related strategy', async () => {
    const context = createMock<ExecutionContext>()
    await expect(githubAuthGuard.canActivate(context)).rejects.toThrow(
      'Unknown authentication strategy "github"',
    )
  })
})
