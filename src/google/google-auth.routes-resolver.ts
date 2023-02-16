import { config } from 'dotenv'

config({ path: '.env' })

export const prefix = process.env.GOOGLE_AUTH_ROUTES_PREFIX || 'auth/google'
export const loginPath = process.env.GOOGLE_AUTH_LOGIN_PATH || '/'
export const redirectPath = process.env.GOOGLE_AUTH_REDIRECT_PATH || 'callback'
