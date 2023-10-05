export class GlobalCustomException extends Error {
  constructor(private readonly errorMessage: string) {
    super(errorMessage);
  }
}
