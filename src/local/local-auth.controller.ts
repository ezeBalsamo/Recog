import { Controller, Inject, Post, Request, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './local-auth.guard'
import {
  LocalAuthModuleOptions,
  LocalAuthServiceBehaviour,
} from './local-auth.interface'
import { MODULE_OPTIONS_TOKEN } from './local-auth.module-definition'

@Controller()
export class LocalAuthController {
  private authService: LocalAuthServiceBehaviour
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: LocalAuthModuleOptions,
  ) {
    this.authService = options.authService
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.handleLoginFor(req.user)
  }
}
