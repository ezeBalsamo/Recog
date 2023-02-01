import { ConfigurableModuleBuilder } from '@nestjs/common'
import { JwtAuthModuleOptions } from './jwt-auth.interface'

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<JwtAuthModuleOptions>().build()
