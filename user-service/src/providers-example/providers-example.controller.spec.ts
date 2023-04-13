import { Test, TestingModule } from '@nestjs/testing';
import { ProvidersExampleController } from './providers-example.controller';

describe('ProvidersExampleController', () => {
  let controller: ProvidersExampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvidersExampleController],
    }).compile();

    controller = module.get<ProvidersExampleController>(ProvidersExampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
