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
   <!-- 4. [ERD](#entity-relationship-diagram) -->
   <!-- 5. [Directory](#directory) -->

## 프로젝트 소개

[저의 영단어 암기를 위해 만든 프로젝트입니다.](https://en.wikipedia.org/wiki/Eating_your_own_dog_food)

이 프로젝트는 폴리레포 프로젝트이고 fullstack 프로젝트입니다. MVP를 빠르게 만들고 유지보수하며 확장하기 위한 프로젝트입니다.

[flash card 백엔드 레포](https://github.com/arch-spatula/flash-card-backend)

### 핵심 기능

<!-- @todo: Card에서 지금 풀어야 하는 카드들 풀기 -->
<!-- @todo: Deck에서 카드 편집하기 -->

### 트러블 슈팅

1. [request waterfall 숨기기](#request-waterfall-숨기기)
2. [card side](#card-side)
3. [부가적인 문제해결](#부가적인-문제해결)

#### request waterfall 숨기기

##### 문제: request waterfall은 동문서답

기다림 끝에 또 유저에게 기다림을 요구하는 것은 관공서로 충분합니다.

유저가 A를 요청하면 처리 후 A를 줘야 합니다. 하지만 request waterfall 현상은 유저가 A를 달라고 하면 처리하고 B를 잠시 두고 있다가 A를 주는 것과 같습니다. 굳이 2번 기다리게 하지말고 1번만 기다리게 해도 됩니다. 유저는 로그인을 위한 요청처리 이후 다시 본인 리소스에 대한 요청인 2번의 request-response 라이프 사이클을 알 필요 없습니다.

![request waterfall - 1](https://user-images.githubusercontent.com/84452145/252219174-765f2a02-48cf-41d3-9dd5-cdc6181f4ab7.gif)

##### 조치: loader에서 리소스를 요청하기

tkdodo의 [React Query meets React Router](https://tkdodo.eu/blog/react-query-meets-react-router)를 그대로 적용했습니다.

React-Router-DOM에서 loader는 Page 접근 전에 실행하는 함수입니다. 실행하고 싶은 로직을 콜백함수로 대입하고 콜백함수의 반환값도 `useLoaderData`로 접근할 수 있습니다.

```tsx
function Cards() {
  const { cards, isLoading, error } = useCards();

  return <>{/* ... 생략 */}</>;
}
```

로직이 중복해서 useCard custom hook으로 담습니다.

```tsx
import { useQuery } from '@tanstack/react-query';
import { cardLoader, cardsQuery } from '@/utils';
import { useLoaderData } from 'react-router-dom';

export function useCards() {
  const loaderCards = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof cardLoader>>
  >;

  const query = cardsQuery();
  const {
    data: cards,
    isLoading,
    error,
  } = useQuery({ ...query, initialData: loaderCards });

  return { cards, isLoading, error };
}
```

useCards 내부에서는 useLoaderData의 결과 값을 react-query에 캐싱합니다.

```tsx
import { cardsQuery } from '@/utils';
import queryClient from '@/libs/queryClient';

export const cardLoader = () => async () => {
  const query = () => ({
    queryKey: ['cards'],
    queryFn: getCardsAPI,
    staleTime: 5000,
  });

  return (
    queryClient.getQueryData<Card[]>(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
```

mount 하기 전에 query-cache는 캐싱하면 Page 컴포넌트 Mount에 요청을 해결할 수 있습니다.

##### 결과: 기다림은 1번

![request waterfall - 2](https://user-images.githubusercontent.com/84452145/252223625-04292074-2754-46c6-9ec3-6038689a7c1b.gif)

- 로그인 시점에 1번만 기다리고 페이지를 방문할 수 있게 됩니다.
- 다른 페이지를 접근해도 불필요한 로딩 스피너가 보이지 않습니다.

<!-- @todo: axios refresh -->
<!--
#### refresh token

refresh token 로직은 순수하게 프론트엔드만 해결하는 문제는 아닙니다. 백엔드도 문제가 있고 이를 해결해야 합니다. 백엔드의 경우 배포환경 서버의 재가동 문제와 refresh 응답입니다.

##### 문제:

token의 만료시간은 1시간이고 유저의 체류시간은 충분히 1시간을 초과할 수 있습니다.

##### 조치:

401 응답에 대해서 token을 자동 갱신하고 동일한 요청을 갱신한 token으로 재요청했습니다.

```ts
axiosClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const {
      config,
      response: { status },
    } = err;

    if (config.url === API_URLS.REFRESH || status !== 401 || config.sent) {
      return Promise.reject(err);
    }

    config.sent = true;
    const accessToken = await refreshAccessAPI();

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return axiosClient(config);
  }
);
```

```ts
import { AxiosError, AxiosResponse } from 'axios';
import { authClient } from './AxiosClient';
import { API_URLS, ROUTE_PATHS, STORAGE_KEY } from '../constant/config';
import { redirect } from 'react-router-dom';

async function refreshAccessAPI() {
  try {
    const sessionToken = sessionStorage.getItem(STORAGE_KEY.SESSION_TOKEN);
    if (!sessionToken) throw Error('sessionToken');

    const {
      data: { access_token },
    } = await authClient.post<{
      success: boolean;
      access_token: string;
    }>(API_URLS.REFRESH, null, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, `${access_token}`);

    return access_token;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_KEY.SESSION_TOKEN);
    redirect(ROUTE_PATHS.SIGN_IN);
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
}
```

##### 결과:

유저는 1시간보다 더 오랫동안 자동 인증이 됩니다. -->

<!-- @todo: card side -->

#### card side

#### 문제: 카드는 3가지 면을 가져야 합니다.

문제, 정답, 편집 3가지 상태를 가져야 합니다. 그리고 문제, 정답 어느 맥락에서 편집을 접근했는지 기억해야 합니다.

#### 조치:

카드의 면접을 기록하고 돌아가기를 하면 기록인 캐시를 접근하는 방식을 고안했습니다.

```ts
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

type CardSide = 'front' | 'back' | 'edit';

const cardSideAtom = atom<CardSide>('front');

const prevCache = new Map<'cache', CardSide>([['cache', 'front']]);

export function useCardSide() {
  const [cardSide, setCardSide] = useAtom(cardSideAtom);

  const toggleTo = useCallback(
    (side: CardSide) => {
      if (cardSide !== side) {
        prevCache.set('cache', cardSide);
        setCardSide(side);
      }
    },
    [setCardSide, cardSide]
  );

  const togglePrev = useCallback(() => {
    setCardSide(prevCache.get('cache') ?? 'front');
  }, [setCardSide]);

  return { togglePrev, cardSide, toggleTo };
}
```

prevCache에 가장 최근에 접근한 카드면을 먼저 기록하고 다음 상태 변경을 합니다.

#### 결과:

![card-flip](https://user-images.githubusercontent.com/84452145/248541998-c6a9c7d9-2c34-4089-8f2a-878c4f020942.gif)

문제에서 편집을 접근하고 돌아갈 수 있고 또 정답에서도 편집으로 돌아갈 수 있습니다.

#### 부가적인 문제해결

- [React Portal](https://arch-spatula.github.io/blog/2023/07/03/request-waterfal)
- [Axios Refresh](https://arch-spatula.github.io/2023/06/19/refresh-interceptor)
- [Save Email](https://arch-spatula.github.io/blog/2023/07/06/save-email)
  <!-- - Optimistic Update -->
  <!-- - Vite Code Splitting -->
  <!-- - Button Spinier -->

## Screen Shot

<!-- @todo: 랜딩, Card, Deck, 로그인, 회원가입, 로그아웃 -->
<!-- @todo: 배포 후 수정하기 -->

### 버튼

![green-btn](https://user-images.githubusercontent.com/84452145/251381619-6c2570a5-952f-4aab-9c0d-6a0d07a5d9ee.gif)

![gray-btn](https://user-images.githubusercontent.com/84452145/251381609-2d9dd8c6-bca2-45ac-a71a-4faa01ee269e.gif)

![red-btn](https://user-images.githubusercontent.com/84452145/251381622-505987e2-eb03-4513-acaf-bafd4429ebd8.gif)

## Tech Stack

1. [Vite React](#vite-react)
2. [Axios](#axios)
3. [React-Router-DOM](#react-router-dom)
4. [React-Query](#react-query)
5. [Jotai](#jotai)
6. [Emotion](#emotion)
7. [React-Spinner](#react-spinner)

### Vite React

- Vite으로 code splitting이 아주 간편하게 처리할 수 있습니다.
- 성능문제가 없는 Vitest를 1.1.0에 테스트러너로 활용할 수 있습니다.

### Axios

- 통신과 관련된 기본적인 추상화 혜택을 받고자 활용합니다.
- interceptor로 인증과 갱신처리 합니다.

### React Router DOM

- loader를 통해 route protect을 적용할 수 있습니다.
- loader에서 prefetch를 사용하고 request-waterfall로 보이는 로딩 스피너를 숨길 수 있습니다.

### React-Query

- 통신 상태를 활용할 수 있습니다.
- 통신 결과를 캐싱할 수 있습니다.
- 통신은 비동기고 화면은 동기적으로 동작시킬 수 있습니다.
- 캐시 키를 통해 전역으로 상태를 공유할 수 있습니다.

### Jotai

- 서버 통신과 무관한 상태관리를 아주 간단하게 할 수 있습니다.

### Emotion

- 스타일링 자원을 간단하게 공유할 수 있습니다.
- 스타일링을 보수하기 수월합니다.

### React-Spinner

- Spinner를 다루기 상당히 간단합니다. storybook 문서를 보고 원하는대로 만들고 붙이면 됩니다.

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
