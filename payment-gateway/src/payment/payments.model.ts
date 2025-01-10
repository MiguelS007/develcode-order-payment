import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  logId: string;

  @Prop({ default: 0 })
  points: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
