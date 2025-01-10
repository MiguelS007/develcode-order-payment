import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Player } from './payments.model';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  @Prop({ required: true })
  id: number;

  @Prop({ type: [{ type: Object, ref: 'Player' }] })
  players: Player[];

  @Prop({ default: 0 })
  totalDeaths: number;

  @Prop({ type: Map, of: Number })
  deathsByCause: Map<string, number>;

  @Prop({ default: 0 })
  worldDeaths: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
