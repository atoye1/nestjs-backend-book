import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function NotIn(property: string, validationOptions?: ValidationOptions) {
  // 데커레이터의 인수는 객체에서 참조하려는 다른 속성의 이름과 validationOptions를 받는다.
  return (object: Object, propertyName: string) => {
    //인수로 데커레이터가 선언될 객체와 속성이름을 받는다.
    registerDecorator({
      //ValidationDecoratorOptions의 객체를 인수로 받는다.
      name: 'NotIn', // 데커레이터의 이름
      target: object.constructor, // 이 데커레이터는 객체가 생성될때 적용됨을 의미
      propertyName,
      options: validationOptions, // 유효성 옵션은 인수로 전달받은 것을 사용한다.
      constraints: [property], // 속성에 적용되도록 제약을 줌
      validator: {
        // 유효성 검사 규칙이 정의됨
        validate(value: any, args: ValidationArguments) {
          console.log('value', value);
          console.log('args', args);
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            !relatedValue.includes(value)
          );
        },
        defaultMessage() {
          // 데커레이터 평가시에 인자로 지정해주면 여기 옵션은 오버라이드됨.
          return 'haha you failed!!';
        },
      },
    });
  };
}
