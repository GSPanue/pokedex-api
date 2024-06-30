import type {
  ICalculateSkip,
  ICalculateItemCount,
  ICalculatePageCount,
  ICalculateCurrentPage,
  ICalculatePageSize,
  IHasNextPage,
  IHasPreviousPage,
} from '@common';

export const calculateSkip: ICalculateSkip = (limit, offset) => limit * offset;

export const calculateItemCount: ICalculateItemCount = (results) =>
  results.length;

export const calculatePageCount: ICalculatePageCount = (limit, count) =>
  Math.ceil(count / limit);

export const calculateCurrentPage: ICalculateCurrentPage = (offset) => offset;

export const calculatePageSize: ICalculatePageSize = (limit) => limit;

export const hasNextPage: IHasNextPage = (offset, pageCount) =>
  offset < pageCount - 1;

export const hasPreviousPage: IHasPreviousPage = (offset) => offset > 0;
