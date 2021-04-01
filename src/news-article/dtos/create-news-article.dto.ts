import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNewsArticleDTO {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  fullArticle: string;
  @ApiProperty()
  @IsNotEmpty()
  datePublished: Date;
}
