export interface ICalculateSkip {
  (limit: number, offset: number): number;
}

export interface ICalculatePageCount {
  (limit: number, offset: number): number;
}

export interface ICalculateItemCount {
  (results): number;
}

export interface ICalculatePageCount {
  (limit: number, count: number): number;
}

export interface ICalculateCurrentPage {
  (offset: number): number;
}

export interface ICalculatePageSize {
  (limit: number): number;
}

export interface IHasNextPage {
  (offset: number, pageCount: number): boolean;
}

export interface IHasPreviousPage {
  (offset: number, pageCount: number): boolean;
}
