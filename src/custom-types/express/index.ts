// eslint-disable-next-line @typescript-eslint/no-namespace,@typescript-eslint/no-unused-vars
declare namespace Express {
  // noinspection JSUnusedGlobalSymbols
  interface Request {
    tenantId?: string;
  }
}
