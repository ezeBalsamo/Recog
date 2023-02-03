import { ConfigurableModuleBuilder } from '@nestjs/common'
import { GoogleAuthModuleOptions } from './google-auth.interface'

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<GoogleAuthModuleOptions>().build()
