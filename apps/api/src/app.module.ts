import { Module } from '@nestjs/common';
import { PaymentsModule } from './payments/payments.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, PaymentsModule],
})
export class AppModule {}
