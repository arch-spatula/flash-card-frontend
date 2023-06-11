import { CardCollection } from '.';

describe('CardCollection', () => {
  let cardCollection: CardCollection;

  beforeEach(() => {
    cardCollection = new CardCollection();
  });

  it('should add a card to the collection', () => {
    const question = 'What is the capital of France?';
    const answer = 'Paris';
    const count = 0;
    const submitDate = new Date();

    cardCollection.addCard(question, answer, count, submitDate);

    expect(cardCollection.items.length).toBe(1);
    expect(cardCollection.items[0].question).toBe(question);
    expect(cardCollection.items[0].answer).toBe(answer);
    expect(cardCollection.items[0].stackCount).toBe(count);
    expect(cardCollection.items[0].submitDate).toStrictEqual(submitDate);
  });

  it('should delete a card from the collection', () => {
    const question = 'What is the capital of France?';
    const answer = 'Paris';
    const count = 0;
    const submitDate = new Date();
    const cardId = 'card-123';

    cardCollection.addCard(question, answer, count, submitDate, cardId);

    cardCollection.deleteCard(cardId);

    expect(cardCollection.items.length).toBe(0);
  });

  it('should edit a card in the collection', () => {
    const question = 'What is the capital of France?';
    const answer = 'Paris';
    const count = 0;
    const submitDate = new Date();
    const newQuestion = 'What is the capital of Germany?';
    const newAnswer = 'Berlin';
    const cardId = 'card-123';

    cardCollection.addCard(question, answer, count, submitDate, cardId);

    cardCollection.editCard(cardId, newQuestion, newAnswer);

    expect(cardCollection.items[0].question).toBe(newQuestion);
    expect(cardCollection.items[0].answer).toBe(newAnswer);
  });

  it('should update stackCount when checking answer', () => {
    const question = 'What is the capital of France?';
    const answer = 'Paris';
    const count = 0;
    const submitDate = new Date();
    const cardId = 'card-123';

    cardCollection.addCard(question, answer, count, submitDate, cardId);

    // Correct answer
    expect(cardCollection.checkAnswer(cardId, 'paris')).toBe(true);
    expect(cardCollection.items[0].stackCount).toBe(1);

    // Incorrect answer
    expect(cardCollection.checkAnswer(cardId, 'berlin')).toBe(false);
    expect(cardCollection.items[0].stackCount).toBe(0);
  });
});
