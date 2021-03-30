export interface IStatusDetailDto {
  code: string,
  type: string,
  actual: Date,
  earliest: Date,
  latest: Date,
  planned: Date,
}