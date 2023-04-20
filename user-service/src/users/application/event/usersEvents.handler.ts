import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../../domain/userCreated.event';
import { Inject } from '@nestjs/common';
import { IEmailService } from '../adapter/iemail.service';

@EventsHandler(UserCreatedEvent)
export class UserEventHandler implements IEventHandler<UserCreatedEvent> {
  constructor(@Inject('EmailService') private emailService: IEmailService) {}

  async handle(event: UserCreatedEvent) {
    switch (event.name) {
      case UserCreatedEvent.name: {
        console.log('User Created Event!!');
        const { email, signupVerifyToken } = event as UserCreatedEvent;
        this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
        break;
      }
      default:
        break;
    }
  }
}
