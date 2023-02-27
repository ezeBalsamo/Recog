import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-github2'
import {
  GITHUB_AUTH_SERVICE,
  GITHUB_AUTH_STRATEGY_OPTIONS,
} from './github-auth.constants'
import {
  GithubAuthServiceBehaviour,
  GithubAuthStrategyOptions,
} from './github-auth.interface'

@Injectable()
export class GithubAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(GITHUB_AUTH_SERVICE)
    private readonly authService: GithubAuthServiceBehaviour,
    @Inject(GITHUB_AUTH_STRATEGY_OPTIONS)
    private readonly options: GithubAuthStrategyOptions,
  ) {
    super(options)
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    return this.authService.handleLoginFor(accessToken, refreshToken, profile)
  }
}
