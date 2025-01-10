import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { getModelToken } from '@nestjs/mongoose';
import { Payment } from './payment.model';
import { Player } from './payments.model';

describe('PaymentService', () => {
  let service: PaymentService;

  const mockPaymentModel = {
    create: jest.fn().mockImplementation((paymentData) => paymentData),
    findOne: jest.fn().mockImplementation((query) => {
      return {
        select: jest.fn().mockReturnValue(Promise.resolve({ id: query.id })),
      };
    }),
    find: jest.fn(),
    updateOne: jest.fn(),
  };

  const mockPlayerModel = {
    new: jest.fn().mockImplementation((playerData) => playerData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: getModelToken(Payment.name),
          useValue: mockPaymentModel,
        },
        {
          provide: getModelToken(Player.name),
          useValue: mockPlayerModel,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a payment', async () => {
    const paymentData = { id: 1, players: [], deathsByCause: new Map() };
    const result = await service.createPayment(1);
    expect(result).toEqual(paymentData);
    expect(mockPaymentModel.create).toHaveBeenCalledWith(paymentData);
  });

  it('should get a payment', async () => {
    const result = await service.getPayment(1);
    expect(result).toEqual({ id: 1 });
    expect(mockPaymentModel.findOne).toHaveBeenCalledWith({ id: 1 });
  });
});
