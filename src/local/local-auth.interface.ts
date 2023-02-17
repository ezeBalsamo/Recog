import { IStrategyOptions, IStrategyOptionsWithRequest } from 'passport-local'

export interface LocalAuthServiceBehaviour {
  validatedUserFrom: (username: string, password: string) => Promise<unknown>

  handleLoginFor(user: any): Promise<any>
}

export type LocalAuthStrategyOptions =
  | IStrategyOptions
  | IStrategyOptionsWithRequest

export interface LocalAuthServiceDefinition {
  imports?: any[]
  class: any
}

export interface LocalAuthModuleOptions {
  strategyOptions?: LocalAuthStrategyOptions
  authServiceDefinition: LocalAuthServiceDefinition
}
