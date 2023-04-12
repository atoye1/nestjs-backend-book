/**
 * 생성자 또는 매서드의 매개변수에 선언되어 적용된다.
 * 3개의 매개변수와 함께 호출된다.
 * 대개 함수 데커레이터와 함께 사용된다.
 * 반환값은 사용되지 않음
 */

// API 요청 매개변수의 유효성 검사하는 데커레이터

class BadRequestException extends Error {}

function MinLength(min: number) {
  return function (target: any, propertKey: string, parameterIndex: number) {
    target.validators = {
      // target은 클래스인데, 클래스의 validators 속성에 이 함수를 미리 삽입하는 것.
      // 이후 Validate 함수 데커레이터에서 여기서 삽입한 minLength를 호출한다.
      minLength: function (args: string[]) {
        return args[parameterIndex].length >= min;
      },
    };
  };
}

function Validate(
  target: any,
  propertKey: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value; // 원래 실행할 메서드를 미리 빼놓는다.
  descriptor.value = function (...args: string[]) {
    // target.validators의 킷값을 대상으로 순회하면서
    // validator에 있는 값(=함수)를 호출하면서 만약 false값이 나오면 에러를 던진다.
    Object.keys(target.validators).forEach((key) => {
      if (!target.validators[key](args)) {
        throw new BadRequestException();
      }
    });
    // 모든 킷값을 대상으로 평가완료되면 원래 실행해야할 메서드를 정상적으로 실행시킨다.
    method.apply(this, args);
  };
}

class User {
  private name: string = '';

  @Validate
  setName(@MinLength(3) name: string) {
    this.name = name;
  }
}

const goodUser = new User();
goodUser.setName('gant');
console.log('--------------------------------------------------');
goodUser.setName('ga'); // Error here!!
