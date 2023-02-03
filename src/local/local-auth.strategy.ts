import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { Injectable } from '@nestjs/common'
import { LocalAuthModuleOptions } from './local-auth.interface'

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  private readonly handleLoginFor: (user) => Promise<unknown>

  constructor(private readonly options: LocalAuthModuleOptions) {
    super()
    this.handleLoginFor = options.handleLoginFor
  }

  async validate(user): Promise<unknown> {
    return this.handleLoginFor(user)
  }
}
