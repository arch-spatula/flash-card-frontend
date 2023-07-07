# flash card frontend

플래시카드 웹 서비스입니다. 플래시카드는 효율적으로 암기하는 학습 도구입니다. 앞에 문제 뒤에는 정답을 작성해서 카드를 만듭니다. 문제를 틀리면 다시 풀고 맞추면 시간을 두고 다시 풀어봅니다. 맞출 때마다 다시 풀어보는 간격을 늘려갑니다.

현재는 1.0.0-alpha는 영단어 암기 위주로 기능을 제공하고 있습니다. 기능은 추가되고 확장될 것입니다. 아래 링크로 즐거운 학습 경험해보기 바랍니다.

[flash card 서비스 배포](https://flash-card-frontend-pi.vercel.app/)

회원가입이 꺼림직하다면 아래 공용 어드민 계정을 활용해볼 수 있습니다. 다른 채용담당자도 볼 수 있기 때문에 조심히 다루기 바랍니다.

```
adminname@email.com
```

```
qwer1234
```

## 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [Screen Shot](#screen-shot)
3. [Tech Stack](#tech-stack)
4. [ERD](#entity-relationship-diagram)
5. [Directory](#directory)

## 프로젝트 소개

[저의 영단어 암기를 위해 만든 프로젝트입니다.](https://en.wikipedia.org/wiki/Eating_your_own_dog_food)

이 프로젝트는 폴리레포 프로젝트이고 fullstack 프로젝트입니다. MVP를 빠르게 만들고 유지보수하며 확장하기 위한 프로젝트입니다.

[flash card 백엔드 레포](https://github.com/arch-spatula/flash-card-backend)

### 핵심 기능

<!-- @todo: Card에서 지금 풀어야 하는 카드들 풀기 -->
<!-- @todo: Deck에서 카드 편집하기 -->

### 트러블 슈팅

<!-- @todo: request waterfal 방지 -->

<!-- @todo: axios refresh -->

<!-- @todo: card side -->

## Screen Shot

<!-- @todo: 랜딩, Card, Deck, 로그인, 회원가입, 로그아웃 -->
<!-- @todo: 배포 후 수정하기 -->

![card-flip](https://user-images.githubusercontent.com/84452145/248541998-c6a9c7d9-2c34-4089-8f2a-878c4f020942.gif)

### 버튼

![green-btn](https://user-images.githubusercontent.com/84452145/251381619-6c2570a5-952f-4aab-9c0d-6a0d07a5d9ee.gif)

![gray-btn](https://user-images.githubusercontent.com/84452145/251381609-2d9dd8c6-bca2-45ac-a71a-4faa01ee269e.gif)

![red-btn](https://user-images.githubusercontent.com/84452145/251381622-505987e2-eb03-4513-acaf-bafd4429ebd8.gif)

## tech Stack

1. Vite React
2. React-Query
3. Jotai
4. Emotion
5. React-Spinner

<!-- @todo: 서비스 아키텍쳐 -->

<!-- @todo ## ERD -->

## 실행 명령

### install the program

```sh
yarn
```

### Run the program

```sh
yarn dev
```

### Run the tests

```sh
yarn test
```

### Run Build

```sh
yarn build
```
