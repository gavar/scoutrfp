import { Latest } from "./types";

/**
 * Service providing communication with the exchange API server.
 */
export class ExchangeService {

  /** API server base URL. */
  public baseUrl: string = "https://api.exchangeratesapi.io";

  /** Fetch latest exchange rate values. */
  async latest(): Promise<Latest> {
    const res = await this.fetch("latest");
    return await res.json();
  }

  protected async fetch(url: string, options?: RequestInit): Promise<Response> {
    const uri = new URL(url, this.baseUrl);
    const res = await fetch(uri.toString(), options);
    if (res.ok) return res;
    const {status} = res;
    const body = await res.json();
    throw new Error(`${status}: ${body.error}`);
  }
}
