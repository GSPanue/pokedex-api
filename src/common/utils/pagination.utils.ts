import type { ICalculateSkip, ICalculateTotalPages } from '@common';

export const calculateSkip: ICalculateSkip = (limit, offset) => limit * offset;

export const calculateTotalPages: ICalculateTotalPages = (limit, count) =>
  Math.ceil(count / limit);
