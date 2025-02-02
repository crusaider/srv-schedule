import fetch from "cross-fetch";
import { concatPaths } from "./conactPaths";

const API_BASE_URL = "https://www.srvatervinning.se";
const API_BASE_PATH = "rest-api/core/sewagePickup";

export async function sendAPIReqest<RT>({
  path,
  query,
}: {
  path: string;
  query?: Record<string, string>;
}): Promise<RT> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  const url = new URL(API_BASE_URL);
  url.pathname = concatPaths(API_BASE_PATH, path);
  if (query) {
    url.search = new URLSearchParams(query).toString();
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `SRV Schedule API request to ${url.toString()} failed with ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<RT>;
}
