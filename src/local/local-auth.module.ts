import { DynamicModule, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { LocalAuthStrategy } from './local-auth.strategy'
import { LocalAuthController } from './local-auth.controller'
import {
  LOCAL_AUTH_SERVICE,
  LOCAL_AUTH_STRATEGY_OPTIONS,
} from './local-auth.constants'
import { LocalAuthModuleOptions } from './local-auth.interface'

@Module({})
export class LocalAuthModule {
  static register(options: LocalAuthModuleOptions): DynamicModule {
    return {
      module: LocalAuthModule,
      imports: [
        PassportModule,
        ...(options.authServiceDefinition.imports || []),
      ],
      providers: [
        LocalAuthStrategy,
        {
          provide: LOCAL_AUTH_SERVICE,
          useClass: options.authServiceDefinition.class,
        },
        {
          provide: LOCAL_AUTH_STRATEGY_OPTIONS,
          useValue: options.strategyOptions,
        },
      ],
      controllers: [LocalAuthController],
    }
  }
}
