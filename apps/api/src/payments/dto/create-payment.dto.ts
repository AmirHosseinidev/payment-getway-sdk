import { IsInt, IsString, IsUrl, Min, MinLength } from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  @Min(1)
  amount: number;

  @IsString()
  @MinLength(1)
  orderId: string;

  @IsUrl({ require_protocol: true })
  callbackUrl: string;
}
