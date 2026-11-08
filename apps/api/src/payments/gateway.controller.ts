import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';

import { PaymentsService } from './payments.service';

@Controller()
export class GatewayController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('gateway/:authority')
  async getGateway(
    @Param('authority') authority: string,
    @Res() res: Response,
  ) {
    await this.paymentsService.getPayment(authority);

    return res.sendFile('gateway.html', {
      root: process.cwd() + '/../../apps/demo',
    });
  }

  @Get('callback')
  getCallback(@Res() res: Response) {
    return res.sendFile('callback.html', {
      root: process.cwd() + '/../../apps/demo',
    });
  }
}
