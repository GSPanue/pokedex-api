import type { ICalculateSkip, ICalculateTotalPages } from '@interfaces';

export const calculateSkip: ICalculateSkip = (limit, offset) => limit * offset;

export const calculateTotalPages: ICalculateTotalPages = (limit, count) =>
  Math.ceil(count / limit);
