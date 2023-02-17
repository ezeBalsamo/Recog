import { DynamicModule, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { GoogleAuthStrategy } from './google-auth.strategy'
import { GoogleAuthController } from './google-auth.controller'
import {
  GOOGLE_AUTH_SERVICE,
  GOOGLE_AUTH_STRATEGY_OPTIONS,
} from './google-auth.constants'
import { GoogleAuthModuleOptions } from './google-auth.interface'

@Module({})
export class GoogleAuthModule {
  static register(options: GoogleAuthModuleOptions): DynamicModule {
    return {
      module: GoogleAuthModule,
      imports: [
        PassportModule,
        ...(options.authServiceDefinition.imports || []),
      ],
      providers: [
        GoogleAuthStrategy,
        {
          provide: GOOGLE_AUTH_SERVICE,
          useClass: options.authServiceDefinition.class,
        },
        {
          provide: GOOGLE_AUTH_STRATEGY_OPTIONS,
          useValue: options.strategyOptions,
        },
      ],
      controllers: [GoogleAuthController],
    }
  }
}
