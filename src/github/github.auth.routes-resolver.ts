import { config } from 'dotenv'

config({ path: '.env' })

export const prefix = process.env.GITHUB_AUTH_ROUTES_PREFIX || 'auth/github'
export const loginPath = process.env.GITHUB_AUTH_LOGIN_PATH || '/'
export const redirectPath = process.env.GITHUB_AUTH_REDIRECT_PATH || 'callback'
