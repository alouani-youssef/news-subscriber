import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

describe('AppService', () => {
  let appService: AppService;
  let postgresHealthIndicator: TypeOrmHealthIndicator;
  let healthCheckService: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: HealthCheckService,
          useValue: {
            check: jest.fn(),
          },
        },
        {
          provide: TypeOrmHealthIndicator,
          useValue: {
            pingCheck: jest.fn().mockResolvedValue({ status: 'ok' }),
          },
        },

      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    postgresHealthIndicator = module.get<TypeOrmHealthIndicator>(TypeOrmHealthIndicator);
    healthCheckService = module.get<HealthCheckService>(HealthCheckService);
  });

  describe('getHealth', () => {
    it('should return health status for postgres, and application', async () => {
      const result = await appService.getHealth();
      expect(result?.postgres?.status).toEqual("ok");
      expect(result?.application?.status).toEqual("ok");
      expect(postgresHealthIndicator.pingCheck).toHaveBeenCalledWith('postgres');
    });
  });
});
