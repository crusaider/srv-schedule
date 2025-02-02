import { sendAPIReqest } from "./sendAPIRequest";
import { SuggestionsResponse } from "./SuggestionsResponse";

export async function findSuggestions(
  query: string,
): Promise<SuggestionsResponse> {
  return sendAPIReqest<SuggestionsResponse>({
    query: { query },
    path: "/getSuggestions",
  });
}
