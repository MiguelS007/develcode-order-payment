import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from './payments.model';

interface RankedPayment {
  name: string;
  points: number;
  rank: number;
}

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    @InjectModel(Payment.name) private PaymentModel: Model<PaymentDocument>,
  ) {}

  async createPayment(payment): Promise<Payment> {
    const newPayment = this.paymentModel.create(payment);
    return newPayment;
  }

  async getPayment(id: number): Promise<Payment> {
    return this.paymentModel.findOne({ id }).select('-_id -__v -Payments');
  }

  async getAllPayments(): Promise<Payment[]> {
    return this.paymentModel.find().select('-_id -__v -Payments');
  }

  async getPaymentsByUserName(userName: string): Promise<any[]> {
    const payments = await this.paymentModel
      .find({ 'Payments.name': userName })
      .select('-_id -__v -totalDeaths -worldDeaths -deathsByCause')
      .lean();

    return payments.map((payment) => {
      const rankedPayments: RankedPayment[] = payment.Payments
        .sort((a, b) => b.points - a.points)
        .map((Payment, index) => ({
          name: Payment.name,
          points: Payment.points,
          rank: index + 1,
        }))
        .filter((Payment) => Payment.name === userName || Payment.rank === 1);

      return { ...payment, Payments: rankedPayments };
    });
  }

  async addPayment(
    paymentId: number,
    logId: string,
    PaymentName: string,
  ): Promise<void> {
    const payment = await this.getPayment(paymentId);
    const PaymentExists = payment.Payments?.some((Payment) => Payment.logId === logId);

    if (!PaymentExists) {
      const Payment = new this.PaymentModel({
        logId,
        name: PaymentName,
        points: 0,
      });
      await this.paymentModel.updateOne(
        { id: paymentId },
        { $push: { Payments: Payment } },
      );
    }
  }

  async updatePayment(
    paymentId: number,
    logId: string,
    newPayment: string,
  ): Promise<void> {
    const payment = await this.paymentModel.findOne({
      id: paymentId,
      'Payments.logId': logId,
    });

    if (payment) {
      await this.paymentModel.updateOne(
        { id: paymentId, 'Payments.logId': logId },
        { $set: { 'Payments': newPayment } },
      );
    } else {
      await this.paymentModel.updateOne(
        { id: paymentId },
        { $push: { Payments: newPayment } },
      );
    }
  }
}
