/**
 * 메서드 바로 앞에 선언되는 데커레이터다
 * 메서드의 속성 설명자에 적용되므로 메서드의 정의를 읽거나 수정할 수 있다.
 * target, propertyKey, descriptor 세 개의 인수를 가진다.
 * 가장 중요한건 수식되는 메서드가 저장된 위치다.
 * descriptor.value가 해당 메서드가 된다.
 */

function handleError(name: string) {
  return function (
    target: any,
    propertKey: string,
    descriptor: PropertyDescriptor // 데커레이터가 변경하는 대상의 핵심이 담겨있다.
  ) {
    console.log(target);
    console.log(propertKey);
    console.log(descriptor);

    const method = descriptor.value; // 원래의 메서드를 저장한다.

    descriptor.value = function () {
      // 여기서 원래의 메서드를 변경한다.
      try {
        console.log(`${name} changed your method haha!!`);
        method();
      } catch (error) {
        console.log(error);
      }
    };
  };
}

class Greeter {
  @handleError('Donghun')
  hello() {
    throw new Error('테스트를 위한 에러');
  }
}
const g = new Greeter();
g.hello();
