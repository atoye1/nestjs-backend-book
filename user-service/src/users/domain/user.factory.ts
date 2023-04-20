// 유저 객체를 생성할 때 이벤트를 발송해야 합니다.
// 이벤트를 발송하는 주체는 유저의 생성자가 되어야 한다.
// 하지만 유저클래스는 new 키워드로 생성해야하므로 이벤트버스를 주입받을 수 없다.
// 따라서 팩토리를 만들어 프로바이더로 제공하자.

import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { UserCreatedEvent } from './userCreated.event';
import { User } from './user';

@Injectable()
export class UserFactory {
  constructor(private eventBus: EventBus) {}
  create(
    id: string,
    name: string,
    email: string,
    signupVerifyToken: string,
    password: string,
  ): User {
    const user = new User(id, name, email, password, signupVerifyToken);
    this.eventBus.publish(new UserCreatedEvent(email, signupVerifyToken));
    return user;
  }

  reconstitute(
    id: string,
    name: string,
    email: string,
    signupVerifyToken: string,
    password: string,
  ): User {
    return new User(id, name, email, password, signupVerifyToken);
  }
}
