import { Module } from '@nestjs/common';
import { ProvidersExampleController } from './providers-example.controller';
import { ServiceA } from './service-A';
import { ServiceB } from './service-B';

@Module({
  controllers: [ProvidersExampleController],
  providers: [ServiceA, ServiceB],
})
export class ProvidersExampleModule {}
