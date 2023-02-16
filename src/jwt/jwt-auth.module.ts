import { DynamicModule, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import {
  JWT_AUTH_SERVICE_PROPS,
  JWT_STRATEGY_OPTIONS,
} from './jwt-auth.constants'
import {
  JwtAuthModuleAsyncOptions,
  JwtAuthModuleOptions,
} from './jwt-auth.interface'
import { JwtAuthStrategy } from './jwt-auth.strategy'
import { JwtAuthService } from './jwt-auth.service'

const moduleProvidingAll = (providers): DynamicModule => ({
  global: true,
  module: JwtAuthModule,
  imports: [PassportModule],
  providers: [JwtAuthStrategy, JwtAuthService, ...providers],
  exports: [JwtAuthService],
})

const optionsClosureByToken = [
  {
    token: JWT_STRATEGY_OPTIONS,
    optionsClosure: moduleOptions => moduleOptions.strategyOptions,
  },
  {
    token: JWT_AUTH_SERVICE_PROPS,
    optionsClosure: moduleOptions => ({
      options: moduleOptions.moduleOptions,
      handlePayload: moduleOptions.handlePayload,
    }),
  },
]

const asyncProvidersFrom = (options: JwtAuthModuleAsyncOptions) => {
  let moduleOptions: JwtAuthModuleOptions | Promise<JwtAuthModuleOptions>
  return optionsClosureByToken.map(({ token, optionsClosure }) => ({
    provide: token,
    inject: options.inject || [],
    useFactory: async (...args) => {
      if (!moduleOptions) {
        moduleOptions = options.useFactory(...args)
        if (moduleOptions instanceof Promise)
          moduleOptions = await moduleOptions
      }
      return optionsClosure(moduleOptions)
    },
  }))
}

const providersFrom = (options: JwtAuthModuleOptions) =>
  optionsClosureByToken.map(({ token, optionsClosure }) => ({
    provide: token,
    useValue: optionsClosure(options),
  }))

@Module({})
export class JwtAuthModule {
  static register(options: JwtAuthModuleOptions): DynamicModule {
    return moduleProvidingAll(providersFrom(options))
  }

  static registerAsync(options: JwtAuthModuleAsyncOptions): DynamicModule {
    const definition = moduleProvidingAll(asyncProvidersFrom(options))
    definition.imports.push(...(options.imports || []))
    return definition
  }
}
