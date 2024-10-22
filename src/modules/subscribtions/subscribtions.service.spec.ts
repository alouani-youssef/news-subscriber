import { Test, TestingModule } from '@nestjs/testing';
import { SubscribtionsService } from './subscribtions.service';

describe('SubscribtionsService', () => {
  let service: SubscribtionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscribtionsService],
    }).compile();

    service = module.get<SubscribtionsService>(SubscribtionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
