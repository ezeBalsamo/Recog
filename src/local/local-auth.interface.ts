import { IStrategyOptions, IStrategyOptionsWithRequest } from 'passport-local'

export interface LocalAuthModuleOptions {
  strategyOptions?: IStrategyOptions | IStrategyOptionsWithRequest
  handleLoginFor: (username: string, password: string) => Promise<unknown>
}
