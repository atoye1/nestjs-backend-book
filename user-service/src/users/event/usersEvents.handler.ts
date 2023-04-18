import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EmailService } from 'email/email.service';
import { UserCreatedEvent } from './userCreated.event';
import { TestEvent } from './test.event';

@EventsHandler(UserCreatedEvent, TestEvent)
export class UserEventHandler
  implements IEventHandler<UserCreatedEvent | TestEvent>
{
  constructor(private emailService: EmailService) {}

  async handle(event: UserCreatedEvent | TestEvent) {
    switch (event.name) {
      case UserCreatedEvent.name: {
        console.log('User Created Event!!');
        const { email, signupVerifyToken } = event as UserCreatedEvent;
        this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
        break;
      }
      case TestEvent.name: {
        console.log('Test Event!!');
        break;
      }
      default:
        break;
    }
  }
}
