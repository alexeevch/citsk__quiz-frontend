import type { $Fetch, NitroFetchOptions } from "nitropack";
import { FetchError } from "ofetch";
import { apiErrorMessages } from "~/utils/message";

export abstract class BaseRepository {
  constructor(private readonly fetcher: $Fetch) {}

  protected async call<T>(url: string, options: NitroFetchOptions<string> = {}): Promise<T> {
    return this.fetcher<T>(url, options).catch((e: unknown) => {
      if (e instanceof FetchError) {
        const status = e.status ?? 500;
        const message = apiErrorMessages[status] ?? "Непредвиденная ошибка";
        throw new AppApiError(message, status, e);
      }
      throw e;
    });
  }
}
