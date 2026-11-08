import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';

import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ApiKeyGuard } from './guards/api-key.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('status')
  getStatus() {
    return this.paymentsService.getStatus();
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  createPayment(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.createPayment(dto);
  }

  @Get(':authority/verify')
  @UseGuards(ApiKeyGuard)
  verifyPayment(@Param('authority') authority: string) {
    return this.paymentsService.verifyPayment(authority);
  }

  @Get(':authority')
  getPayment(@Param('authority') authority: string) {
    return this.paymentsService.getPayment(authority);
  }

  @Post(':authority/simulate')
  simulatePayment(
    @Param('authority') authority: string,
    @Body('success') success: boolean,
  ) {
    return this.paymentsService.simulatePayment(authority, success);
  }
}
