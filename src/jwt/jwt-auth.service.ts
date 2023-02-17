import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JWT_AUTH_SERVICE_PROPS } from './jwt-auth.constants'
import { JwtAuthServiceProps } from './jwt-auth.interface'

@Injectable()
export class JwtAuthService extends JwtService {
  readonly handlePayload: (payload: unknown) => Promise<unknown>

  constructor(@Inject(JWT_AUTH_SERVICE_PROPS) props: JwtAuthServiceProps) {
    super(props.options)
    this.handlePayload = props.handlePayload
  }
}
