import { IStrategyOptions, IStrategyOptionsWithRequest } from 'passport-local'

export interface LocalAuthServiceBehaviour {
  validatedUserFrom: (username: string, password: string) => Promise<unknown>

  handleLoginFor(user: any): Promise<any>
}

export interface LocalAuthModuleOptions {
  strategyOptions?: IStrategyOptions | IStrategyOptionsWithRequest
  authService: LocalAuthServiceBehaviour
}
