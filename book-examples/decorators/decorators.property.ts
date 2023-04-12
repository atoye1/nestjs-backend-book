/**
 *  속성 데커레이터이므로 클래스의 속성을 수식한다.
 * target은 클래스고, propertyKey의 인자로 받는 key로 속성을 특정할 수 있다.
 */

function format(formatString: string) {
  return function (target: any, propertyKey: string): any {
    let value = target[propertyKey]; // 타겟이 되는 속성을 저장해 놓는다.
    function getter() {
      return `${formatString} ${value}`;
    }

    function setter(newVal: string) {
      console.log('setter activated');
      value = newVal;
    }

    return {
      get: getter,
      set: setter,
      configurable: true,
      enumerable: true,
    };
  };
}

class Greeter2 {
  // constructor(public greeting: string) {}
  @format('Hello')
  greeting: string = 'nest.js';
}

const greeter2 = new Greeter2();
console.log(greeter2.greeting);
greeter2.greeting = 'spring.java';
console.log(greeter2.greeting);
