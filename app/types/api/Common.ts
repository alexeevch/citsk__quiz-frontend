export interface ApiResponseCollection<T> {
  items: T[];
  meta: ApiPaginator;
}

export type ApiPaginator = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  path: string;
  next_page_url: string | null;
  prev_page_url: string | null;
};

export type ApiQueryPaginator = {
  limit?: number;
  page?: number;
};

export type ApiQueryOrder<T extends string> = T | `-${T}`;
