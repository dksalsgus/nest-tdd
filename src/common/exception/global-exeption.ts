export class GlobalException extends Error {
  constructor(private readonly errorMessage: string) {
    super(errorMessage);
  }
}
