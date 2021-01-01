export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type PaginationDefaults = {
  limit: number;
  offset: number;
  sortField: string;
  sortDir: SortDirection;
};

export type PaginationResponse = {
  count: number;
  rows: any[];
};
