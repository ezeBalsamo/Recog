import { Controller, Get, Inject, UseGuards, Request } from '@nestjs/common'
import { loginPath, prefix, redirectPath } from './github.auth.routes-resolver'
import { GITHUB_AUTH_SERVICE } from './github-auth.constants'
import { GithubAuthServiceBehaviour } from './github-auth.interface'
import { GithubAuthGuard } from './github-auth.guard'

@Controller(prefix)
export class GithubAuthController {
  constructor(
    @Inject(GITHUB_AUTH_SERVICE)
    private readonly authService: GithubAuthServiceBehaviour,
  ) {}

  @UseGuards(GithubAuthGuard)
  @Get(loginPath)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async login() {}

  @UseGuards(GithubAuthGuard)
  @Get(redirectPath)
  async redirect(@Request() req) {
    return this.authService.handleRedirectionFor(req.user)
  }
}
