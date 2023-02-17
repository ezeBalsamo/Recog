import { LocalAuthServiceBehaviour } from '../local-auth.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MockLocalAuthService implements LocalAuthServiceBehaviour {
  async validatedUserFrom(
    username: string,
    password: string,
  ): Promise<unknown> {
    return Promise.resolve({
      username: username,
      password: password,
      id: '1',
    })
  }

  async handleLoginFor(user: any): Promise<any> {
    return Promise.resolve({ username: user.username, token: '1234' })
  }
}
