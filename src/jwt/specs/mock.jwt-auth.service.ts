import { JwtService } from '@nestjs/jwt'

export default class MockJwtAuthService extends JwtService {
  handlePayload(payload: any): Promise<any> {
    return Promise.resolve({ ...payload, id: '1' })
  }
}
