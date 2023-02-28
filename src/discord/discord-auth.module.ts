import { DynamicModule, Module } from '@nestjs/common'
import { DiscordAuthModuleOptions } from './discord-auth.interface'
import { PassportModule } from '@nestjs/passport'
import { DiscordAuthStrategy } from './discord-auth.strategy'
import {
  DISCORD_AUTH_SERVICE,
  DISCORD_AUTH_STRATEGY_OPTIONS,
} from './discord-auth.constants'
import { DiscordAuthController } from './discord-auth.controller'

@Module({})
export class DiscordAuthModule {
  static register(options: DiscordAuthModuleOptions): DynamicModule {
    return {
      module: DiscordAuthModule,
      imports: [
        PassportModule,
        ...(options.authServiceDefinition.imports || []),
      ],
      providers: [
        DiscordAuthStrategy,
        {
          provide: DISCORD_AUTH_SERVICE,
          useClass: options.authServiceDefinition.class,
        },
        {
          provide: DISCORD_AUTH_STRATEGY_OPTIONS,
          useValue: options.strategyOptions,
        },
      ],
      controllers: [DiscordAuthController],
    }
  }
}
