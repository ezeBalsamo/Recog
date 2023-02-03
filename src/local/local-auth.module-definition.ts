import { ConfigurableModuleBuilder } from '@nestjs/common'
import { LocalAuthModuleOptions } from './local-auth.interface'

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<LocalAuthModuleOptions>().build()
