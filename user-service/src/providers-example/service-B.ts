import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from './base-service';
import { ServiceA } from './service-A';

@Injectable()
export class ServiceB extends BaseService {
  // 따라서 아래와 같이 자식 클래스인 serviceB에서 부모 클래스의
  // 생성자에 serviceA를 전달해줘야 한다.
  // 부모는 @Injectable()이 아니므로, 자식에서 주입받아 부모에 전달한 뒤
  // 주입된 부모 클래스를 상속받은 인스턴스를 생성해서 활용하는 것.
  constructor(private readonly _serviceA: ServiceA) {
    super(_serviceA);
  }

  // 만약 위의 super()방식이 번거롭다면 속성기반으로 주입받을 수도 있다.
  @Inject(ServiceA) private propServiceA: ServiceA;
  getHello(): string {
    return this.doSomeFuncFromA();
  }

  getHelloProp(): string {
    return this.doSomeFuncFromA();
  }
}
