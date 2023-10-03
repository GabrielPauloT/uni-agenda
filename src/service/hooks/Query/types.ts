import { UseQueryResult } from "@tanstack/react-query";

export type UseApiQueryResult<ResultType, Error> = UseQueryResult<
  ResultType,
  Error
> & {
  totalRecords: number;
};
