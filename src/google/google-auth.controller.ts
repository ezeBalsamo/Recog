import { Controller, Inject, Request } from '@nestjs/common'
import {
  GoogleAuthModuleOptions,
  GoogleAuthServiceBehaviour,
} from './google-auth.interface'
import { MODULE_OPTIONS_TOKEN } from './google-auth.module-definition'

@Controller()
export class GoogleAuthController {
  private authService: GoogleAuthServiceBehaviour

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: GoogleAuthModuleOptions,
  ) {
    this.authService = options.authService
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async login() {}

  async redirect(@Request() req) {
    return this.authService.handleRedirectionFor(req.user)
  }
}
