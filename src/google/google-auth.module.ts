import { Module } from '@nestjs/common'
import { ConfigurableModuleClass } from './google-auth.module-definition'
import { PassportModule } from '@nestjs/passport'
import { GoogleAuthStrategy } from './google-auth.strategy'
import { GoogleAuthController } from './google-auth.controller'
import config from 'recog-config'
import { GOOGLE_AUTH_SERVICE_CLASS } from './google-auth.constants'

const {
  google: { authServiceDefinition },
} = config

@Module({
  imports: [PassportModule, ...(authServiceDefinition.imports || [])],
  providers: [
    GoogleAuthStrategy,
    {
      provide: GOOGLE_AUTH_SERVICE_CLASS,
      useClass: authServiceDefinition.class,
    },
  ],
  controllers: [GoogleAuthController],
})
export class GoogleAuthModule extends ConfigurableModuleClass {}
