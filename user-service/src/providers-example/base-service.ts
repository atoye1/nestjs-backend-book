import { Injectable } from '@nestjs/common';
import { ServiceA } from './service-A';

// Injectable이 Base class에 선언되어 있지 않으면
// 상속받는 클래스는 Base에 주입된 serviceA를 사용할 수 없다.
// @Injectable()
export class BaseService {
  constructor(private readonly serviceA: ServiceA) {}
  getHello(): string {
    return 'hello from base';
  }

  doSomeFuncFromA(): string {
    return this.serviceA.getHello();
  }
}
