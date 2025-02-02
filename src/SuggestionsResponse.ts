export interface SuggestionsResponse {
  readonly results: ReadonlyArray<{
    readonly name: string;
    readonly customerId: string;
    readonly address: string;
    readonly city: string;
  }>;
}
