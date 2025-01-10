import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest
              .fn()
              .mockImplementation(
                (payload) => `mockJwtToken.${payload.username}`,
              ),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('login should return an access token', async () => {
    const loginDto = { username: 'test', role: 'admin' };
    const result = await service.login(loginDto);
    expect(result).toHaveProperty('access_token');
    expect(result.access_token).toBe(`mockJwtToken.${loginDto.username}`);
  });
});
