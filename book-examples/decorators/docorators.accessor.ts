/**
 * 접근자 데커레이터는 접근자 바로 앞에 선언된다.
 * 따라서 접근자의 정의를 읽거나 수정할 수 있다.
 */

function Enumerable(enumerable: boolean) {
  return function (
    target: any,
    Key: string,
    descriptor: PropertyDescriptor
  ): void {
    descriptor.enumerable = enumerable;
  };
}

class Person {
  constructor(private name: string) {}
  // Person클래스의 속성에도 인덱스 시그니쳐 적용 가능.
  [key: string]: string;

  @Enumerable(true)
  get getName() {
    return this.name + ' From getter!';
  }

  @Enumerable(false)
  set setName(name: string) {
    this.name = name;
  }
}

const p = new Person('Seol');
for (let key in p) {
  console.log(`${key} : ${p[key]}`);
}
