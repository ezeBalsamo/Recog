export interface RecogGoogleConfigAuthServiceDefinition {
  imports?: any[]
  class: any
}

interface RecogGoogleConfigAuthServiceRoutes {
  prefix: string
  redirectPath: string
  loginPath: string
}

export interface RecogGoogleConfig {
  authServiceDefinition: RecogGoogleConfigAuthServiceDefinition
  routes: RecogGoogleConfigAuthServiceRoutes
}
