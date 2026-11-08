import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { GatewayController } from './gateway.controller';
import { PaymentsService } from './payments.service';

@Module({
  controllers: [PaymentsController, GatewayController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
