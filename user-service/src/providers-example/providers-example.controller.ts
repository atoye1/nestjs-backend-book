import { Get, Controller } from '@nestjs/common';
import { ServiceB } from './service-B';

@Controller('providers-example')
export class ProvidersExampleController {
  constructor(private readonly serviceB: ServiceB) {}

  @Get('/serviceB')
  getHelloC() {
    return this.serviceB.getHello();
  }

  // 속성기반으로 주입받은 프로바이더를 사용하는 컨트롤러
  @Get('/serviceBProp')
  getHelloProp() {
    return this.serviceB.getHelloProp();
  }
}
