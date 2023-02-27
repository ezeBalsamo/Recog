import { Profile, StrategyOptions } from 'passport-github2'

export interface GithubAuthServiceBehaviour {
  handleLoginFor(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any>

  handleRedirectionFor(user: any): Promise<any>
}

export interface GithubAuthStrategyOptions extends StrategyOptions {
  scope: string[] | undefined
}

export interface GithubAuthServiceDefinition {
  imports?: any[]
  class: any
}

export interface GithubAuthModuleOptions {
  strategyOptions: GithubAuthStrategyOptions
  authServiceDefinition: GithubAuthServiceDefinition
}
