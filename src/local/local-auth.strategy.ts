import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { Injectable } from '@nestjs/common'
import { LocalAuthModuleOptions } from './local-auth.interface'

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  private readonly handleLoginFor: (
    username: string,
    password: string,
  ) => Promise<unknown>

  constructor(private readonly options: LocalAuthModuleOptions) {
    super()
    this.handleLoginFor = options.handleLoginFor
  }

  async validate(username: string, password: string): Promise<unknown> {
    return this.handleLoginFor(username, password)
  }
}
