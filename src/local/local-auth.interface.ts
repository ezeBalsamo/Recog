export interface LocalAuthModuleOptions {
  handleLoginFor: (user) => Promise<unknown>
}
