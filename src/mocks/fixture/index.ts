type User = {
  _id: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
};

const users: { documents: User[] } = {
  documents: [
    {
      _id: '1234asdf',
      email: 'username@email.com',
      passwordHash: '12345678',
      passwordSalt: '12345678',
    },
  ],
};

const cards = {
  documents: [
    {
      _id: '1234asdf',
      question: '도큐사우르스 짱짱맨',
      answer: '킹정',
      submitDate: 'Wed May 17 2023 21:11:26 GMT+0900 (한국 표준시)',
      stackCount: '0',
      userId: '1234asdf',
    },
    {
      _id: '1234qwer',
      question: '블로그를 더 간지나게 만드는 방법',
      answer: 'github pages로 DIY로 만든다.',
      submitDate: 'Wed May 17 2023 21:11:26 GMT+0900 (한국 표준시)',
      stackCount: '0',
      userId: '1234asdf',
    },
  ],
};

export { users, cards };
