export interface LocalAuthModuleOptions {
  handleLoginFor: (username: string, password: string) => Promise<unknown>
}
