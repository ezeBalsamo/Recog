import { DynamicModule, Module } from '@nestjs/common'
import { GithubAuthModuleOptions } from './github-auth.interface'
import { PassportModule } from '@nestjs/passport'
import { GithubAuthStrategy } from './github-auth.strategy'
import {
  GITHUB_AUTH_SERVICE,
  GITHUB_AUTH_STRATEGY_OPTIONS,
} from './github-auth.constants'
import { GithubAuthController } from './github-auth.controller'

@Module({})
export class GithubAuthModule {
  static register(options: GithubAuthModuleOptions): DynamicModule {
    return {
      module: GithubAuthModule,
      imports: [
        PassportModule,
        ...(options.authServiceDefinition.imports || []),
      ],
      providers: [
        GithubAuthStrategy,
        {
          provide: GITHUB_AUTH_SERVICE,
          useClass: options.authServiceDefinition.class,
        },
        {
          provide: GITHUB_AUTH_STRATEGY_OPTIONS,
          useValue: options.strategyOptions,
        },
      ],
      controllers: [GithubAuthController],
    }
  }
}
