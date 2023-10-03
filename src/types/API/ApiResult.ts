// import { ApiMessage } from "./ApiMessage";

export type ApiResult<t> = {
  Result: t;
  StatusCode: number;
  TotalRecords?: number;
  Page: number;
  PerPage: number;
};
