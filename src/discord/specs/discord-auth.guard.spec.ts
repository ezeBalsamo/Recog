import { DiscordAuthGuard } from '../discord-auth.guard'
import { createMock } from '@golevelup/ts-jest'
import { ExecutionContext } from '@nestjs/common'

describe('DiscordAuthGuard', () => {
  it('should throw an error when there is no related strategy', async () => {
    const discordAuthGuard = new DiscordAuthGuard()
    const context = createMock<ExecutionContext>()
    await expect(discordAuthGuard.canActivate(context)).rejects.toThrow(
      'Unknown authentication strategy "discord"',
    )
  })
})
