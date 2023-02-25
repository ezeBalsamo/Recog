import { Profile, StrategyOptions } from 'passport-github2'

export interface GithubAuthServiceBehaviour {
  handleLoginFor(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any>

  handleRedirectionFor(user: any): Promise<any>
}

export interface GithubAuthServiceDefinition {
  imports?: any[]
  class: any
}

export interface GithubAuthModuleOptions {
  strategyOptions: StrategyOptions
  authServiceDefinition: GithubAuthServiceDefinition
}
