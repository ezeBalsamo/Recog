import { Controller, Inject, Request, UseGuards } from '@nestjs/common'
import {
  GoogleAuthModuleOptions,
  GoogleAuthServiceBehaviour,
} from './google-auth.interface'
import { MODULE_OPTIONS_TOKEN } from './google-auth.module-definition'
import { GoogleAuthGuard } from './google-auth.guard'

@Controller()
export class GoogleAuthController {
  private authService: GoogleAuthServiceBehaviour

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: GoogleAuthModuleOptions,
  ) {
    this.authService = options.authService
  }

  @UseGuards(GoogleAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async login() {}

  @UseGuards(GoogleAuthGuard)
  async redirect(@Request() req) {
    return this.authService.handleRedirectionFor(req.user)
  }
}
