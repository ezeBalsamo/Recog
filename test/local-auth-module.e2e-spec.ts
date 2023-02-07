import { Test } from '@nestjs/testing'
import { LocalAuthModule } from '../src/local/local-auth.module'
import { MockLocalAuthService } from '../src/local/specs/mock-local-auth.service'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

describe('LocalAuthModule (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [
        LocalAuthModule.register({
          authService: new MockLocalAuthService(),
        }),
      ],
    }).compile()
    app = testingModule.createNestApplication()
    await app.init()
  })

  describe('/login (POST)', () => {
    it('should succeed when the credentials are valid', () => {
      const user = { username: 'Bruce Wayne', password: 'iAmBatman' }
      return request(app.getHttpServer())
        .post('/login')
        .send(user)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201)
        .expect({
          username: user.username,
          token: '1234',
        })
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
