import { SearchResponse } from "./SearchResponse";
import { sendAPIReqest } from "./sendAPIRequest";

export async function search(query: string): Promise<SearchResponse> {
  return sendAPIReqest<SearchResponse>({
    path: "search",
    query: { query },
  });
}
