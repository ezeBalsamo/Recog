export interface LocalAuthModuleOptions {
  handleLogin: (username: string, password: string) => Promise<unknown>
}
