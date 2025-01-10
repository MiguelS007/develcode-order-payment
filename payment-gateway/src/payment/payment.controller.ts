import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from './payment.model';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserName } from 'src/auth/user-name.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payments')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Roles('admin')
  @Get('get-by-id/:id')
  @ApiOperation({ summary: 'Get payment by ID' })
  async getPayment(@Param('id') id: number): Promise<Payment> {
    return this.paymentService.getPayment(id);
  }

  @Roles('admin')
  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  async getAllPayments(): Promise<Payment[]> {
    return this.paymentService.getAllPayments();
  }

  @Roles('admin')
  @Post()
  @ApiOperation({ summary: 'create payments' })
  async createPayment(payment): Promise<Payment[]> {
    return this.paymentService.createPayment(payment);
  }
}
