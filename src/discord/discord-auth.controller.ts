import { Controller, Get, Inject, UseGuards, Request } from '@nestjs/common'
import { loginPath, prefix, redirectPath } from './discord-auth.routes-resolver'
import { DISCORD_AUTH_SERVICE } from './discord-auth.constants'
import { DiscordAuthServiceBehaviour } from './discord-auth.interface'
import { DiscordAuthGuard } from './discord-auth.guard'

@Controller(prefix)
export class DiscordAuthController {
  constructor(
    @Inject(DISCORD_AUTH_SERVICE)
    private readonly authService: DiscordAuthServiceBehaviour,
  ) {}

  @UseGuards(DiscordAuthGuard)
  @Get(loginPath)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async login() {}

  @UseGuards(DiscordAuthGuard)
  @Get(redirectPath)
  async redirect(@Request() req) {
    return this.authService.handleRedirectionFor(req.user)
  }
}
