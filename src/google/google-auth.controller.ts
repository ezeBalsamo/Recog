import { Controller, Get, Inject, Request, UseGuards } from '@nestjs/common'
import { GoogleAuthServiceBehaviour } from './google-auth.interface'
import { GoogleAuthGuard } from './google-auth.guard'
import { GOOGLE_AUTH_SERVICE } from './google-auth.constants'
import { prefix, loginPath, redirectPath } from './google-auth.routes-resolver'

@Controller(prefix)
export class GoogleAuthController {
  constructor(
    @Inject(GOOGLE_AUTH_SERVICE)
    private readonly authService: GoogleAuthServiceBehaviour,
  ) {}

  @UseGuards(GoogleAuthGuard)
  @Get(loginPath)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async login() {}

  @UseGuards(GoogleAuthGuard)
  @Get(redirectPath)
  async redirect(@Request() req) {
    return this.authService.handleRedirectionFor(req.user)
  }
}
