## NestJS로 배우는 백엔드 프로그래밍

### 한용재님의 [NestJS로 배우는 백엔드 프로그래밍]을 학습한 내용을 기록하는 저장소입니다

이 책은 아래와 같은 두 갈래로 구성되어 있습니다.

1. 네스트의 기본 구조와 기능을 설명하는 파트
2. 설명한 내용을 바탕으로 실제 유저관리 서비스를 만드는 파트

book-example에서는 구조와 기능을 설명하는 파트의 코드를 연습하고,  
user-service에서는 실제 유저관리 서비스를 저자의 안내에 따라 충실히 학습한 내용을 기록하겠습니다.

### NestJS를 학습하는 이유

프레임워크의 큰 장점은 역량이 부족한 개발자도 일정한 품질의 코드를 작성할 수 있게 틀을 잡아주는 것이라 생각합니다.

저와 같은 뉴비는 어떤 패턴이 좋은 아키텍쳐인지 알지 못하므로 Express와 같이 자유분방한 프레임워크를 사용하면 자신이 가진 나쁜 습관대로 코딩하게 됩니다. 이런 문제점이 프레임워크를 사용함으로써 방지될 수 있습니다. 또한 일정한 규칙에 따라 코드를 작성하므로 협업환경에서 코드의 가독성과 유지보수성도 자연스럽게 향상 될 수 있습니다.

저도 예전 코드를 보면 DRY와 객체지향, OCP등을 철저히 무시한 의식의 흐름대로 코드를 작성한 사례가 많이 있습니다. 자연스럽게 유지보수성, 테스트가능성, 코드품질, 가독성이 안드로메다로 날아간 코드가 작성되었습니다. 이런 경우엔 일단 동작하는 코드를 작성한 이후에 더 큰 문제가 발생했었습니다. 기능추가나 디버그를 하려고 해도 스스로 작성한 코드의 난해함과 유닛테스트가 작성되지 않아 기존 기능이 망가질 것 같은 두려움에 개선을 포기한 경험이 있었습니다.

Nest.js 프레임워크를 학습하면서 모범 패턴과 아키텍쳐를 익히고 코드 품질과 성능까지 고려하는 코드를 작성할 수 있는 개발자로 한걸음 더 성장하고자 합니다. 오랜 기간동안 잘 동작하는 탄탄한 소프트웨어 엔지니어링을 위해선 확장엔 열려있고, 변화엔 닫혀있는 테스트가능한 예쁜 코드를 작성해야함을 필요성을 경험을 통해 깨닫게 되었으니깐 말이죠.

## 목차

### 1. Hello NestJS

### 2. 웹 개발 기초 지식

### 3. 애플리케이션의 관문: 인터페이스

### 4. 핵심 도메인 로직을 포함하는 프로바이더

### 5. SW 복잡도를 낮추기 위한 모듈 설계

### 6. 동적 모듈을 활용한 환경 변수 구성

### 7. 파이프와 유효성 검사: 요청이 제대로 전달되었는지

### 8. 영속화: 데이터를 기록하고 다루기

### 9. 요청 처리 전에 부기기능을 수행하기 위한 미들웨어

### 10. 권한 확인을 위한 가드 : JWT 인증 / 인가

### 11. 로깅 : 애플리케이션의 동작 기록

### 12. 모든 것은 항상 실패한다 : 예외 필터

### 13. 인터셉터로 요청과 응답을 입맛에 맞게 바꾸기

### 14. 태스크 스케쥴링

### 15. 헬스 체크

### 16. CQRS를 이용한 관심사 분리

### 17. 클린 아키텍쳐

### 18. 테스트 자동화
