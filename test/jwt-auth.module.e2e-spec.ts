import {
  Controller,
  Get,
  UseGuards,
  Request,
  INestApplication,
} from '@nestjs/common'
import { JwtAuthGuard } from '../src/jwt/jwt-auth.guard'
import { Test } from '@nestjs/testing'
import { JwtAuthModule } from '../src/jwt/jwt-auth.module'
import { ExtractJwt } from 'passport-jwt'
import * as request from 'supertest'
import { sign } from 'jsonwebtoken'

@Controller()
class MockController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return `Profile of ${req.user.name}, identified by ${req.user.id}`
  }
}
describe('JwtAuthModule (e2e)', () => {
  let app: INestApplication
  const secret = 'Clark Kent is Superman'

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [
        JwtAuthModule.register({
          moduleOptions: { secret },
          strategyOptions: {
            secretOrKey: secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          },
          handlePayload: payload => Promise.resolve({ ...payload, id: '1' }),
        }),
      ],
      controllers: [MockController],
    }).compile()
    app = testingModule.createNestApplication()
    await app.init()
  })

  describe('/profile (GET)', () => {
    it('should throw an Unauthorized (HTTP 401) error when jwt is absent', () => {
      return request(app.getHttpServer())
        .get('/profile')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(401)
        .expect({
          statusCode: 401,
          message: 'Unauthorized',
        })
    })

    it('should throw an Unauthorized (HTTP 401) error when jwt is invalid', () => {
      return request(app.getHttpServer())
        .get('/profile')
        .auth('invalidJwt', { type: 'bearer' })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(401)
        .expect({
          statusCode: 401,
          message: 'Unauthorized',
        })
    })

    it('should succeed when jwt is valid', () => {
      const payload = { name: 'Matt Murdock' }
      const validJwt = sign(payload, secret)
      return request(app.getHttpServer())
        .get('/profile')
        .auth(validJwt, { type: 'bearer' })
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(200)
        .expect(`Profile of ${payload.name}, identified by 1`)
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
