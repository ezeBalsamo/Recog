import { Controller, Inject, Post, Request, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './local-auth.guard'
import { LocalAuthServiceBehaviour } from './local-auth.interface'
import { LOCAL_AUTH_SERVICE } from './local-auth.constants'
import { prefix, loginPath } from './local-auth.routes-resolver'

@Controller(prefix)
export class LocalAuthController {
  constructor(
    @Inject(LOCAL_AUTH_SERVICE)
    private readonly authService: LocalAuthServiceBehaviour,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post(loginPath)
  async login(@Request() req) {
    return this.authService.handleLoginFor(req.user)
  }
}
