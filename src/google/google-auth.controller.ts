import { Controller, Request } from '@nestjs/common'
import {
  GoogleAuthModuleOptions,
  GoogleAuthServiceBehaviour,
} from './google-auth.interface'

@Controller()
export class GoogleAuthController {
  private authService: GoogleAuthServiceBehaviour

  constructor(options: GoogleAuthModuleOptions) {
    this.authService = options.authService
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async login() {}

  async redirect(@Request() req) {
    return this.authService.handleRedirectionFor(req.user)
  }
}
