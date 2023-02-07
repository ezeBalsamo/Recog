import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { LocalAuthStrategy } from './local-auth.strategy'
import { LocalAuthController } from './local-auth.controller'
import { ConfigurableModuleClass } from './local-auth.module-definition'

@Module({
  imports: [PassportModule],
  providers: [LocalAuthStrategy],
  controllers: [LocalAuthController],
})
export class LocalAuthModule extends ConfigurableModuleClass {}
