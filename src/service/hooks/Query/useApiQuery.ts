import { useState } from "react";

import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { UseApiQueryResult } from "./types";
import { ApiResult } from "@/types/API";

export function useApiQuery<
  ResultType = unknown,
  ApiResultType extends ApiResult<ResultType> = ApiResult<ResultType>,
>(
  options: UseQueryOptions<ApiResultType, Error, ResultType>,
): UseApiQueryResult<ResultType, Error> {
  const [totalRecords, setTotalRecords] = useState(-1);
  const { queryFn, ...config } = options;

  const query = useQuery<ApiResultType, Error, ResultType>({
    ...config,
    queryFn: async (context) => {
      if (!queryFn) throw Error("Query Function not implemented");
      const response = await queryFn(context);

      if (response.TotalRecords) setTotalRecords(response.TotalRecords);

      return response;
    },
    select: (response) => {
      const { Result } = response;

      return Result;
    },
  });

  return {
    ...query,
    totalRecords,
  };
}
