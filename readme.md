## NestJS로 배우는 백엔드 프로그래밍

### 한용재님의 [NestJS로 배우는 백엔드 프로그래밍]을 학습한 내용을 기록하는 저장소입니다

이 책은 아래와 같은 두 갈래로 구성되어 있습니다.

1. 네스트의 기본 구조와 기능을 설명하는 파트
2. 설명한 내용을 바탕으로 실제 유저관리 서비스를 만드는 파트

book-example에서는 구조와 기능을 설명하는 파트의 코드를 연습하고,  
user-service에서는 실제 유저관리 서비스를 저자의 안내에 따라 충실히 학습한 내용을 기록하겠습니다.

### NestJS를 학습하는 이유

프레임워크의 큰 장점은 역량이 부족한 개발자도 일정한 품질의 코드를 작성할 수 있게 틀을 잡아주는 것이라 생각합니다.

저와 같은 뉴비는 동일한 기능을 구현하는 코드라도 어떻게 작성해야 더 좋을지 알기 어렵습니다. 이러한 상황에서 Express와 같이 자유분방한 프레임워크를 사용하면 자신이 가진 나쁜 습관대로 코딩하게 됩니다. 프레임워크를 사용하면 이런 문제점을 예방할 수 있습니다. 또한 일정한 규칙에 따라 코드를 작성하므로 협업환경에서 코드의 가독성과 유지보수성도 자연스럽게 향상 될수 있습니다.

저도 예전 코드를 보면 DRY와 객체지향, OCP등을 철저히 무시한 의식의 흐름대로 코드를 작성한 사례가 많이 있습니다. 자연스럽게 유지보수성, 테스트가능성, 코드품질, 가독성이 안드로메다로 날아간 코드가 작성되었습니다. 이런 경우엔 일단 동작하는 코드를 작성한 이후에 더 큰 문제가 발생했었습니다. 기능추가나 디버그를 하려고 해도 스스로 작성한 코드의 난해함과 유닛테스트가 작성되지 않아 기존 기능이 망가질 것 같은 두려움에 개선을 포기한 경험이 있었습니다.

Nest.js 프레임워크를 학습하면서 모범 패턴과 아키텍쳐를 익히고 코드 품질과 성능까지 고려하는 코드를 작성할 수 있는 개발자로 한걸음 더 성장하고자 합니다. 오랜 기간동안 잘 동작하는 탄탄한 소프트웨어를 위해선 확장엔 열려있고, 변화엔 닫혀있는 테스트가능한 예쁜 코드를 작성해야 함을 경험을 통해 깨닫게 되었으니깐 말이죠.

## 목차

### 1. Hello NestJS

### 2. 웹 개발 기초 지식

### 3. 애플리케이션의 관문: 인터페이스

라우팅

- @Controller(), @Get() 등의 데커레이터로 라우팅한다.
- 라우팅 패스는 와일드 카드 사용 가능하다.

요청 객체와 응답 객체

- @Req(), @Res() 파라미터 데커레이터를 사용해서 요청과 응답객체에 직접 접근할 수 있다.
- @HttpCode() 메서드 데커레이터를 사용하면 응답 코드를 손쉽게 변경 가능.

헤더와 리다이렉션

- @Header(<key>, <value>)로 헤더를 손쉽게 추가
- @Redirect(<url>, <status_code>)로 리다이렉션 가능하다.
- 동적으로 리다이렉트하려면 { "url":string, "statusCode":string} 형식의 객체를 반환하면 된다.
- 동적 리다이렉션시에도 (당연히) @Redirect 데커레이터와 함께 사용해야 정상적으로 리다이렉션이 된다.

아래는 `/redirect/docs?version=5` 입력시 `docs.nestjs.com/v5/`로 리다이렉션 해주는 컨트롤러다.

- ```typescript
  @Get('redirect/docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5')
      return {url : 'https://docs.nestjs.com/v5/'}
  }
  ```

라우트 매개변수

- @Param(<variable>) 데커레이터로 라우트 매개변수를 컨트롤러에 주입해 사용할 수 있다.
- 한 변수에 여러개의 매개변수를 받는 것도 가능하나 베스트 프랙티스는 아니다.
- Restful하게 설계하면 경로 매개변수는 많지 않으므로 아래처럼 따로 받는걸 추천한다.
- ```typescript
  @Delete(':userId/memo/:memoId')
  deleteUserMemo(
    @Param('userId') userId : string,
    @Param('memoId') memoId : string,
  )
  ```

하위 도메인 라우팅

- @Controller 데커레이터에 하위 도메인을 명시하는 옵션을 넣어주면 된다.
- ```typescript
  @Contorller({host: 'api.localhost})
  export class ApiController {}
  ```

페이로드 다루기

- POST, PUT, PATCH의 바디에 포함되는 정보를 다루는 것
- @Body() 파라미터 데커레이터를 사용한다.
- 전송 데이터의 일관성과 타이핑을 위해 DTO를 선언해서 활용하는 것이 좋다.

유저 서비스에 적용하기  
회원가입, 이메일 인증, 로그인, 회원정보 조회의 4가지 기능을 구현한다.

1. POST /users
2. POST /users/email-verify
3. POST /users/login
4. GET /users/:id

dto를 정의하고, 컨트롤러의 기초함수를 작성해 놓는다.  
상세로직은 아직 작성하지 않고 전달받는 dto를 그대로 출력하는 방식으로만  
구현해 놓으면 기능추가나 디버깅시 편리하다.

### 4. 핵심 도메인 로직을 포함하는 프로바이더

예전에 작성한 express.js 서에서는 라우터와 컨트롤러만을 분리하고, 컨트롤러에서 DB에 직접 접근하는 방법을 사용했었다.  
네스트에서 컨트롤러는 인증, 라우팅, 쿼리 파라미터 등의 해석만을 담당하고 핵심 비즈니스 로직은 프로바이더(서비스)가 담당하도록 한다. 컨트롤러와 프로바이더를 분리함으로서 얻는 이점은 다음과 같다.

- SRP에 더 부합된 코드를 작성할 수 있다.
- 의존성 주입이 가능해 재사용성과 확장성이 증가된다.
- 코드의 가독성과 유지보수성도 (당연히) 증가한다.

Nest에서는 @Injectable()로 수식된 프로바이더 클래스를 어떤 모듈에서나 주입받아 재사용 할 수 있다. 프로바이더 클래스의 인스턴스는 네스트 런타임이 최초에 싱글턴패턴으로 생성해놓고, 명시된 모듈에서 사용할 수 있도록 주입해준다

다른 프로바이더를 상속받은 프로바이더를 주입할 때는 속성기반프로바이더를 사용하면 간편하다.

---

유저 서비스에 적용하기

`nest g s Users`로 서비스 프로바이더를 생성한다.

- createUser

  1. 해당 이메일의 유저가 있는지 검사한다.
  2. db에 유저 정보를 저장한다.
  3. VerifyToken과 함께 이메일을 전송한다. 토큰은 uuid로 생성한다.
  4. DB연동이 필요해 미구현한 기능에는 모킹데이터나 TODO를 명시.

- sendMemberJoinEmail 구현

  1. 별도의 기능이므로 따로 서비스를 분리해서 구현한다. `nest g s Email`
  2. 간단한 nodemailer라이브러리와 naver stmp를 연동해서 구현
  3. 네이버의 경우 mailOptions에서 from을 실제 주소와 동일하게 지정해야 한다.(https://velog.io/@kdkeiie8/NodeJS-nodemailer-%EB%84%A4%EC%9D%B4%EB%B2%84-%EA%B3%84%EC%A0%95%EC%9C%BC%EB%A1%9C-%EC%9D%B4%EC%9A%A9%ED%95%98%EA%B8%B0)

- 이메일 인증처리 컨트롤러, 로그인 컨트롤러 모킹해놓기
  1. DB연동이 필요한 부분이므로 커스텀 에러를 던지게만 모킹해놓는다.

Nest.js의 스코프
클래스인 컨트롤러와 프로바이더에 옵션으로 제공해서 생명주기를 컨트롤하는 것  
따로 설정하지 않으면 디폴트인 `싱글턴 인스턴스가 전역에서 공유`되는 방식이 채택된다.  
싱글턴 인스턴스는 캐싱가능하고, 초기화가 서버 시작할때 한번만 일어나므로 성능과 메모리측면에서 효율적이다.

다만 그래프QL 어플리케이션의 요청밸 캐싱이나 멀티 테넌시 모델의 구현을 위해서는  
`REQUEST` 옵션으로 요청별로 인스턴스를 생성하고 삭제하는 방식의 관리가 필요하다.

커스텀프로바이더 - 심화학습  
특정 라이브러리에 선언된 클래스를 가져오거나 모킹할땐 커스텀프로바이더 사용해야 한다. 특히 다음과 같은 경우에 커스텀 프로바이더를 사용하는 것이 권장된다.

1. Nest 프레임워크가 관리하는 인스턴스 대신 인스턴스를 직접 생성하고 싶을 때
2. 여러 클래스가 의존관계에 있을때, 클래스를 재사용하고자 할 때
3. 테스트를 위해 모킹버전의 프로바이더 재정의가 필요할때

커스텀 프로바이더의 종류

1. 밸류프로바이더
2. 클래스 프로바이더
3. 팩토리 프로바이더

### 5. SW 복잡도를 낮추기 위한 모듈 설계

모듈은 함수나 클래스보단 큰 단위로 `논리적 기능`단위로 분리된 조각이다.
음식점 서비스는 UserModule, OrderModule, DeliveryModule과 같이 분리 가능하다.

네스트에서 모듈은 `@Module(metadata: ModuleMetadata):ClassDecorator`로 수식된 클래스다.  
import는 이 모듈에서 사용하기위해 다른 모듈에 있는 프로바이더를 가지고 오는 부분이다.  
모듈은 주입해서 사용할 수 없는데, 순환종속성이 발생할 수 있기 때문이다.  
따라서 트리와 같은 구조로 import 해서 사용해야 하고,  
중간모듈에서 하위 모듈을 import, export하면 상위 모듈은 중간모듈만 import해도 하위 모듈에 접근할 수 있다.  
모듈들에 위계적으로, 이행적으로 접근할 수 있다.

---

유저 서비스에 모듈 분리 적용하기  
아래와 같이 적용된다.  
모듈이 중복 import되면 오류가 발생한다.  
맨 아래 Email 모듈에서 EmailService를 export하여 유저모듈에서 Email 모듈만 import 해도 EmailService를 사용할 수 있다.

app.module.ts

```typescript
@Module({
  imports: [UsersModule] // Email 모듈을 더 이상 참조하지 않으므로 삭제
  controllers: [AppController],
  providers: [AppService],
})
```

user.module.ts

```typescript
@Module({
  imports: [EmailModule],
  controllers: [UsersController],
  providers: [UsersService],
  // providers: [UsersService, EmailService], email.module.ts에서 서비스르 export 해주므로 직접 참조하지 않아도 된다.
})
export class UsersModule {}
```

email.module.ts

```typescript
@Module({
  providers: [EmailService],
  // Email Provider를 모듈 바깥에서 사용할 수 있게 명시해준다.
  // Email Module만 import한 모듈에서도 Email Service를 사용할 수 있다.
  exports: [EmailService],
})
export class EmailModule {}
```

### 6. 동적 모듈을 활용한 환경 변수 구성

local, stage, development 환경변수 동적 구성
.env파일에 저장된 개별 키밸류를 의미있는 단위로 묶어서 활용하면 편리하다.  
@nestjs/config에서 제공해주는 기능으로 구현한다.

`src/config/env`에 .env파일들을 생성한다.  
Nest의 기본 빌드 옵션은 \*.ts만 포함하므로 아래와 같이 nest-cli.json을 수정해주어야 한다. ㅓㅏ

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "assets": [
      {
        "include": "./config/env/*.env",
        "outDir": "./dist"
      }
    ]
  }
}
```

이메일 서비스의 경우 emailConfig를 어플리케이션 스코프에서 주입해 활용하기 위해서  
루트모듈에서 import하고, Joi라이브러리를 활용한 validationSchema를 별도로 선언해서 유효성 검증도 수행한다.

주입가능해진 emailConfig를 다음과 같이 주입할 수 있다.  
서비스를 주입할때와 형태가 약간 다름을 인지하고, 언제든지 참고해서 구현할 수 있도록 하자.

```typescript
// 데커레이터의 토큰이 아까 emailConfig.ts에서 registerAs 함수를 호출할때 등록했던 'email'이다.
// 따라서 emailConfig.KEY === 'email'이 성립한다.
constructor( @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>)
```

예전 프로젝트에서도 환경변수가 많아짐에 따라 유효성검사와 undefined때문에 고생했었다.  
환경변수가 제대로 들어왔는지 로그를 찍거나, 디버거로 확인하느라 아까운 시간을 낭비한 경험이 있다.  
Nest.js 프레임워크에서 제공하는 환경변수 검증, 주입 도구를 활용하니 초기설정이 약간 복잡하지만 설정된 이후의 유지보수와 디버깅이 훨씬 간단해졌다.  
이래서 형님들이 프레임워크를 만드셨고, 사용하시는구나...

실수로 올라간 .env파일을 지우려면 .gitignore를 적절히 업데이트 한 다음  
셸에서 `git rm --cached $(git ls-files -i -c -X .gitignore)`를 실행한다.

### 7. 파이프와 유효성 검사: 요청이 제대로 전달되었는지

파이프는 요청이 컨트롤러로 전달되기 전에 요청을 변환할 수 있다. 미들웨어와 유사한데, 미들웨어는 애플리케이션의 모든 컨텍스트에서 사용할 수 없다.  
파이프는 보통 변환과 유효성검사의 두 가지 역할을 수행한다. Nest에서 기본으로 제공하는 파이프는 다음과 같다.

1. ValidationPipe
2. ParseIntPipe
3. ParseBoolPipe
4. ParseArrayPipe
5. ParseUUIDPipe
6. DefaultValuePipe : 값이 들어오지 않을 때 기본값을 설정할때 사용한다.

아래와 같이 DefaultValuePipe와 ParseIntPipe를 조합해서 활용할 수 있다.
매개변수를 생략하면 기본값이 설정되지만 int로 파싱될 수 없는 값이 전달되면 파이프가 에러를 던진다.

```typescript
@Get()
findAll(
  @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
)
```

유효성 검사 파이프를 만들기 위해 `class-validator`, `class-transformer`라이브러리를 설치한다.
Joi보다 간편하게 유효성 검사에 활용가능하다.

일반적으로 dto선언시 클래스의 속성 데커레이터로 class-validator에서 제공해주는 유효성 검사를 적용해 놓는다.  
이후 decorated DTO를 대상으로 validation을 수행하는 ValidationPipe를 @Body()와 같은 파라미터 데커레이터의 인자로 주입한다.

```typescript
export class CreateUserDto { // DTO에 validator 적용
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  name: string;

  @IsEmail()
  email: string;
}

@Post() // @Body() 데커레이터의 인자로 Validation Pipe전달하여 DTO를 검증.
create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
  return this.userService.create(createUserDto)
}
```

Validation Pipe를 전역스코프에 적용하려면 부트스트랩 과정에서
`app.userGlobalPipe(new ValidationPipe())`와 같이 설정해준다.

---

유저 서비스에 유효성 검사 적용하기
class-transformer에서 제공하는 `@Transfrom()`을 활용하면 손쉽게 커스템 밸리데이션 로직을 만들 수 있다.  
@Transfrom의 인자는 전체 객체(보통 DTO)에 대한 값을 갖고있으므로, DTO의 속성간 비교하는 로직도 가능함.

만약 @Transform을 사용하기 싫으면 아래와 같이 커스텀 유효성 검사기를 작성할 수 있다.
(근데 아직 완전히 이해는 못함)

```typescript
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
      },
    });
  };
}
```

### 8. 영속화: 데이터를 기록하고 다루기

typeorm을 활용한 db 연결

디펜던시 설치해준다.

`npm i typeorm@0.3.7 @nestjs/typeorm@9.0.0 mysql2`

.env에 있는 내용이 동적으로 로딩되게 설정해 놓았으므로 process.env의 내용을 전역에서 사용가능하다.  
이 정보로 db에 접속한다.

엔티티를 정의하고, 모듈을 등록하고, 저장소객체를 생성해서 서비스에 저장소를 주입해야하는데 조금 혼란스러울 수 있으니 아래와 같이 차근차근 하면 된다. 순서는 알고 있어야 나중에 구글링하더라도 이해가 빠르다.

1. 엔티티를 정의한다. @Entitiy(entitiy-name)로 수식된 클래스가 있는 entitiy파일을 신규로 생성한다.
2. 엔티티를 외부 DB에서 사용할 수 있게 루트모듈의 TypeOrmModule의 entities에 등록해줘야 한다.
   - 만약 synchronize가 true라면 네스트는 여기 등록된 엔티티를 기준으로 테이블을 갱신한다.
3. UserModule에서 모듈 내에 사용할 저장소를 등록한다.
   - 2번은 네스트 외부에 전달하기위해 등록한 것이라면, 3번은 네스트 안에서 사용하기위해 등록한것
   - `TypeOrmModule.forFeature([UserEntity])` 모듈 내에서 사용할거니깐 forFeature로 등록한다.
4. @InjectRepository데커레이터를 활용해서 서비스에 유저 저장소를 주입한다.(당연히 생성자에 주입.)
   - `@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>`

TypeOrm에서 트랜잭션 적용하는 방법은 두 가지가 있다.

1. QueryRunner를 사용(공식문서에서 추천하는 방식)

```typescript
  private async saveUserUsingQueryRunner(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const queryRunner = this.datasource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = new UserEntity();
      user.id = uuid.v1();
      user.name = name;
      user.password = password;
      user.email = email;
      user.signupVerifyToken = signupVerifyToken;
      await queryRunner.manager.save(user);
      throw new InternalServerErrorException();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return false;
    } finally { // try...catch 안에서 return은 finally블록 실행 이후에 실행되므로 정상적으로 release() 할 수 있다.
      console.log('finally works');
      await queryRunner.release();
    }
  }
```

2. transaction 함수를 직접 사용 : 문법이 훨씬 간결해보인다. 하지만 세부적으로 통제가능한 query Runner 방식이 더 좋아 보임.

```typescript
private async saveUserUsingTransaction(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    await this.dataSource.transaction(async (manager) => {
      const user = new UserEntity();
      user.id = ulid();
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = signupVerifyToken;

      await manager.save(user);
    });
  }
```

### 9. 요청 처리 전에 부기기능을 수행하기 위한 미들웨어

### 10. 권한 확인을 위한 가드 : JWT 인증 / 인가

### 11. 로깅 : 애플리케이션의 동작 기록

### 12. 모든 것은 항상 실패한다 : 예외 필터

### 13. 인터셉터로 요청과 응답을 입맛에 맞게 바꾸기

### 14. 태스크 스케쥴링

### 15. 헬스 체크

### 16. CQRS를 이용한 관심사 분리

쿼리와 커맨드를 분리해서 효과적인 구조를 구현하자.

### 17. 클린 아키텍쳐

소프트웨어의 계층을 분리해서 일관적인 의존성으로 안정적인 구조를 만들자.

### 18. 테스트 자동화

테스트는 기본입니다.

```

```

```

```

```

```

```

```
