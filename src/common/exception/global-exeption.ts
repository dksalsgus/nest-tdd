export class GlobalCustomException extends Error {
  constructor(
    private readonly errorCode: EnErrorCode,
    private readonly errorMessage: string,
  ) {
    super(errorMessage);
  }
}

export enum EnErrorCode {
  userNotFound = 'USR001',
  naverOauthUrlError = 'NAO001',
}
