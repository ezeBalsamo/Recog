import {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from './jwt-auth.module-definition'
import { DynamicModule, Module } from '@nestjs/common'
import { JwtAuthStrategy } from './jwt-auth.strategy'
import { JwtModule } from '@nestjs/jwt'

@Module({
  providers: [JwtAuthStrategy],
})
export class JwtAuthModule extends ConfigurableModuleClass {
  static baseJwtModule: DynamicModule
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    if (!options.moduleOptions)
      throw new Error('Jwt Module options must be provided.')
    const baseOptions = super.register(options)
    JwtAuthModule.baseJwtModule = JwtModule.register(options.moduleOptions)
    return {
      ...baseOptions,
      imports: [...(baseOptions.imports || []), JwtAuthModule.baseJwtModule],
    }
  }
}
