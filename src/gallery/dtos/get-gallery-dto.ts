import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsIn } from 'class-validator';

export class GetGalleryFilterDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  search: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  page: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  limit: number;
}
