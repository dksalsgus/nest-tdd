export class GlobalCustomError extends Error {
  constructor(private readonly errorMessage: string) {
    super(errorMessage);
  }
}
