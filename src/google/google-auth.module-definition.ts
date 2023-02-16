import { ConfigurableModuleBuilder } from '@nestjs/common'
import { GoogleAuthStrategyOptions } from './google-auth.interface'

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<GoogleAuthStrategyOptions>().build()
