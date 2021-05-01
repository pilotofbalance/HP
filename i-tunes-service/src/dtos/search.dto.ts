import { IsString } from 'class-validator';

export class CreateSearchDto {
  @IsString()
  public artist: string;
}
