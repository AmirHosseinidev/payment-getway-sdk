import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getStatus() {
    const paymentsCount = await this.prisma.payment.count();

    return {
      message: 'Payment API is running',
      status: 'OK',
      database: 'Connected',
      paymentsCount,
    };
  }

  async createPayment(dto: CreatePaymentDto) {
    const authority = randomBytes(32).toString('hex');

    const payment = await this.prisma.payment.create({
      data: {
        authority,
        amount: dto.amount,
        orderId: dto.orderId,
        callbackUrl: dto.callbackUrl,
        status: 'PENDING',
      },
    });

    return {
      message: 'Payment created successfully',
      authority: payment.authority,
      amount: payment.amount,
      status: payment.status,
      paymentUrl: `http://localhost:3000/gateway/${authority}`,
    };
  }

  async getPayment(authority: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { authority },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  async simulatePayment(authority: string, success: boolean) {
    const payment = await this.getPayment(authority);

    if (payment.status !== 'PENDING') {
      throw new BadRequestException('Payment already processed');
    }

    const updatedPayment = await this.prisma.payment.update({
      where: { authority },
      data: {
        status: success ? 'SUCCESS' : 'FAILED',
      },
    });

    return {
      message: 'Payment result simulated successfully',
      authority: updatedPayment.authority,
      status: updatedPayment.status,
    };
  }

  async verifyPayment(authority: string) {
    const payment = await this.getPayment(authority);

    return {
      verified: payment.status === 'SUCCESS',
      authority: payment.authority,
      amount: payment.amount,
      orderId: payment.orderId,
      status: payment.status,
    };
  }
}
