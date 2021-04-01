export class PaginationDto {
  page: number;
  limit: number;
  count: number;
}

export class PaginatedResultDto<T> {
  data: T;
  pagination: PaginationDto;
}
