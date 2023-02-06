import { Controller, Request, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './local-auth.guard'
import {
  LocalAuthModuleOptions,
  LocalAuthServiceBehaviour,
} from './local-auth.interface'

@Controller()
export class LocalAuthController {
  private authService: LocalAuthServiceBehaviour
  constructor(private readonly options: LocalAuthModuleOptions) {
    this.authService = options.authService
  }

  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.handleLoginFor(req.user)
  }
}
