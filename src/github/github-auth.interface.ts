import { Profile } from 'passport-github2'

export interface GithubAuthServiceBehaviour {
  handleLoginFor(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any>
}
