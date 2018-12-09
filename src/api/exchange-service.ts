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
    return await fetch(uri.toString(), options);
  }
}
