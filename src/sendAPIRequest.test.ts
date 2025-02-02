import { sendAPIReqest } from "./sendAPIRequest";

jest.mock("cross-fetch");
import fetch from "cross-fetch";

const { Response } =
  jest.requireActual<typeof import("cross-fetch")>("node-fetch");

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("sendAPIReqest", () => {
  afterEach(() => {
    mockedFetch.mockClear();
  });

  it("should make a GET request with the correct URL, search params and headers", async () => {
    const path = "/test";

    mockedFetch.mockResolvedValueOnce(new Response("{}"));

    await sendAPIReqest({ path, query: { test: "test" } });

    expect(fetch).toHaveBeenCalledWith(
      "https://www.srvatervinning.se/rest-api/core/sewagePickup/test?test=test",
      expect.objectContaining({
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }),
    );
  });

  it("should URL encode search params", async () => {
    const path = "/test";

    mockedFetch.mockResolvedValueOnce(new Response("{}"));

    await sendAPIReqest({ path, query: { test: "åäö " } });

    expect(fetch).toHaveBeenCalledWith(
      "https://www.srvatervinning.se/rest-api/core/sewagePickup/test?test=%C3%A5%C3%A4%C3%B6+",
      expect.objectContaining({
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }),
    );
  });

  it("should throw an error if the API request fails", async () => {
    const path = "/test";

    // Mock the fetch function to return a non-ok response
    mockedFetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Internal Server Error",
      status: 500,
    } as Response);

    await expect(sendAPIReqest({ path })).rejects.toThrow(
      "SRV Schedule API request to https://www.srvatervinning.se/rest-api/core/sewagePickup/test failed with 500 Internal Server Error",
    );
  });

  it("should return the response if the request is successful", async () => {
    const path = "/test";
    const response = { data: "test" };

    // Mock the fetch function to return a successful response
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(response),
    } as unknown as Response);

    const result = await sendAPIReqest({ path });

    expect(result).toEqual(response);
  });
});
