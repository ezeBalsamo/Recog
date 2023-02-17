import { config } from 'dotenv'

config({ path: '.env' })

export const prefix = process.env.LOCAL_AUTH_ROUTES_PREFIX || 'auth/local'
export const loginPath = process.env.LOCAL_AUTH_LOGIN_PATH || '/'
