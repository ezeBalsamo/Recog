import { config } from 'dotenv'
import * as process from 'process'

config({ path: '.env' })

export const prefix = process.env.DISCORD_AUTH_ROUTES_PREFIX || 'auth/discord'
export const loginPath = process.env.DISCORD_AUTH_LOGIN_PATH || '/'
export const redirectPath = process.env.DISCORD_AUTH_REDIRECT_PATH || 'callback'
