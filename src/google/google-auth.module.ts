import { Module } from '@nestjs/common'
import { ConfigurableModuleClass } from './google-auth.module-definition'
import { PassportModule } from '@nestjs/passport'
import { GoogleAuthStrategy } from './google-auth.strategy'
import { GoogleAuthController } from './google-auth.controller'

@Module({
  imports: [PassportModule],
  providers: [GoogleAuthStrategy],
  controllers: [GoogleAuthController],
})
export class GoogleAuthModule extends ConfigurableModuleClass {}
