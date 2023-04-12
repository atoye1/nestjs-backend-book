/**
 * 클래스 데커레이터는 클래스 앞에 선언되는 데커레이터다.
 * 클래스의 생성자에 적용된다.
 * T 타입은 생성자를 가지는 특정 객체를 의미한다. 그러니 클래스가 된다.
 */

const addAgeDeco =
  (age: number) =>
  <T extends { new (...args: any[]): {} }>(constructor: T) =>
    class extends constructor {
      age = age;
    };

class Human {
  constructor(public name: string) {}
}

@addAgeDeco(13)
class Human2 {
  constructor(public name: string) {}
}

const h = new Human('seol');
const h2 = new Human2('kim');

console.log(h); // Human { name: 'seol' }
console.log(h2); // Human2 { name: 'kim', age: 13 }
// error - 타입스크립트는  데커레이터를 활용한 클래스의 타입변화를 알지 못한다.
// console.log(h2.age);
