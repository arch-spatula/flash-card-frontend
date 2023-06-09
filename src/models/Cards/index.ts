class CardRecord {
  public question: string;
  public answer: string;
  public stackCount: number;
  public submitDate: Date;
  private _id?: string;
  readonly userId?: string;

  constructor(
    question: string,
    answer: string,
    stackCount = -1,
    submitDate = new Date(),
    id?: string,
    userId?: string
  ) {
    this.question = question;
    this.answer = answer;
    this.stackCount = stackCount;
    this.submitDate = submitDate;
    this._id = id;
    this.userId = userId;
  }

  get count() {
    return this.stackCount;
  }

  get id() {
    return this._id;
  }
}

export class CardCollection {
  private cardArr: CardRecord[];
  constructor(...cards: CardRecord[]) {
    this.cardArr = [...cards];
  }

  addCard(
    question: string,
    answer: string,
    count: number,
    submitDate: Date,
    id?: string
  ) {
    const card = new CardRecord(question, answer, count, submitDate, id);
    this.cardArr.push(card);
  }

  deleteCard(id: string) {
    this.cardArr = this.cardArr.filter((card) => card.id !== id);
  }

  editCard(id: string, question: string, answer: string) {
    this.cardArr.map((card) => {
      if (card.id === id) {
        if (question) card.question = question;
        if (answer) card.answer = answer;
      } else return card;
    });
  }

  checkAnswer(id: string, submit: string) {
    const [card] = this.cardArr.filter((card) => card.id === id);
    const regex = new RegExp(card.answer, 'i');
    regex.test(submit) ? this.#correct(id) : this.#wrong(id);
  }

  #correct(id: string) {
    const [card] = this.cardArr.filter((card) => card.id === id);
    if (card.stackCount === -1) card.stackCount = 1;
    else card.stackCount += 1;
  }

  #wrong(id: string) {
    const [card] = this.cardArr.filter((card) => card.id === id);
    card.stackCount = 0;
  }

  get items() {
    return this.cardArr;
  }
}