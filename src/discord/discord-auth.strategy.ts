import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import {
  DISCORD_AUTH_SERVICE,
  DISCORD_AUTH_STRATEGY_OPTIONS,
} from './discord-auth.constants'
import {
  DiscordAuthServiceBehaviour,
  DiscordAuthStrategyOptions,
  DiscordProfile,
} from './discord-auth.interface'
import { Strategy } from 'passport-discord'

@Injectable()
export class DiscordAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(DISCORD_AUTH_SERVICE)
    private readonly authService: DiscordAuthServiceBehaviour,
    @Inject(DISCORD_AUTH_STRATEGY_OPTIONS)
    private readonly options: DiscordAuthStrategyOptions,
  ) {
    super(options)
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: DiscordProfile,
  ): Promise<any> {
    return this.authService.handleLoginFor(accessToken, refreshToken, profile)
  }
}
