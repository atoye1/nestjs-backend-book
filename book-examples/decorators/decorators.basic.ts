/**
 * 데커레이터를 활용하면 횡단 관심사를 분리해서 관점지향 프로그래밍을 할 수 있다.
 * 종단으로 흐르는 데이터에 공통적으로 작용해야하는 로직을 데커레이터로 분리하는 것
 * SRP, IOC를 달성하는데도 도움을 준다.
 *
 * 데커레이터는 위로부터 평가되고, 아래로부터 호출된다.
 * 모든 데커레이터가 호출 된 후 원래 함수가 호출된다.
 */

function deco(target: any, propertKey: string, descriptor: PropertyDescriptor) {
  console.log('decorator evaluated');
}

function decoWithArg(val: string) {
  return function (
    target: any,
    propertKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(`decoWithArg evaluated ${val}`);
  };
}

class TestClass {
  @deco
  @decoWithArg('deco arg')
  test() {
    console.log('test() function called');
  }
}

const t = new TestClass();
t.test();
