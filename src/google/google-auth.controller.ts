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

  redirect(@Request() req) {
    return this.authService.handleRedirectionFor(req.user)
  }
}
