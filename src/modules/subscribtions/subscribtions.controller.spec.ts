import { Test, TestingModule } from '@nestjs/testing';
import { SubscribtionsController } from './subscribtions.controller';

describe('SubscribtionsController', () => {
  let controller: SubscribtionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscribtionsController],
    }).compile();

    controller = module.get<SubscribtionsController>(SubscribtionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
