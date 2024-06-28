export interface ICalculateSkip {
  (limit: number, offset: number): number;
}

export interface ICalculateTotalPages {
  (limit: number, offset: number): number;
}
