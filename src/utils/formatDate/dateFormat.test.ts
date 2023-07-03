import { describe, expect, it } from 'vitest';
import { formatDate, getNextIntervalDate } from '.';

describe('formatDate', () => {
  const baseDateStr = '2023-06-01T00:00:00';
  const baseDate = new Date(baseDateStr);

  it('should return "지금" when there is no remaining time', () => {
    const result = formatDate(baseDate, -1, baseDate);
    expect(result).toBe('지금');
  });

  it('should return formatted remaining time', () => {
    const now = new Date('2023-06-01T00:09:30'); // 9분 30초 후
    const result1 = formatDate(baseDate, 0, now);
    expect(result1).toBe('30초 후');

    const now2 = new Date('2023-06-01T00:55:00'); // 55분 후
    const result2 = formatDate(baseDate, 1, now2);
    expect(result2).toBe('5분 후');

    const now3 = new Date('2023-06-01T12:00:00'); // 12시간 후
    const result3 = formatDate(baseDate, 2, now3);
    expect(result3).toBe('12시간 후');

    const now4 = new Date('2023-06-02T00:00:00'); // 1일 후
    const result4 = formatDate(baseDate, 3, now4);
    expect(result4).toBe('1일 후');

    const now5 = new Date('2023-06-01T06:00:00'); // 2일 6시간 후
    const result5 = formatDate(baseDate, 4, now5);
    expect(result5).toBe('2일 후');

    const now6 = new Date('2023-06-01T12:00:00'); // 3일 12시간 후
    const result6 = formatDate(baseDate, 5, now6);
    expect(result6).toBe('3일 후');

    const now7 = new Date(baseDateStr); // 7일 후
    const result7 = formatDate(baseDate, 6, now7);
    expect(result7).toBe('1주 후');

    const now8 = new Date(baseDateStr); // 14일 후
    const result8 = formatDate(baseDate, 7, now8);
    expect(result8).toBe('2주 후');

    const now9 = new Date(baseDateStr); // 1달 후
    const result9 = formatDate(baseDate, 8, now9);
    expect(result9).toBe('1개월 후');

    const now10 = new Date(baseDateStr); // 2달 후
    const result10 = formatDate(baseDate, 9, now10);
    expect(result10).toBe('2개월 후');

    const now11 = new Date(baseDateStr); // 3달 후
    const result11 = formatDate(baseDate, 10, now11);
    expect(result11).toBe('3개월 후');

    const now12 = new Date(baseDateStr); // 6달 후
    const result12 = formatDate(baseDate, 11, now12);
    expect(result12).toBe('6개월 후');

    const now13 = new Date(baseDateStr); // 1년 후
    const result13 = formatDate(baseDate, 12, now13);
    expect(result13).toBe('1년 후');
  });
});

describe('intervalDate', () => {
  const baseDate = new Date('2023-06-01T00:00:00');
  const intervalMap = [
    10, // 0 틀림 10분
    60, // 1번 맞춤 1시간
    60 * 24, // 2번 맞춤 내일
    60 * 24 * 2,
    60 * 24 * 3,
    60 * 24 * 4,
    60 * 24 * 7, // 6번 맞춤 다음주
    60 * 24 * 14, // 7번 맞춤 다다음주
    60 * 24 * 30.4375, // 8번 맞춤 다음달
    60 * 24 * 30.4375 * 2, // 9번 다다음달
    60 * 24 * 91.3125, // 10번 맞춤 다음분기
    60 * 24 * 182.625, // 11번 맞춤 다음반기
  ];

  it('should return the same date when count is negative', () => {
    const result = getNextIntervalDate(baseDate, -1, intervalMap);
    expect(result).toStrictEqual(baseDate);
  });

  it('should return the correct date when count is within range', () => {
    const result = getNextIntervalDate(baseDate, 0, intervalMap);
    expect(result).toStrictEqual(new Date('2023-06-01T00:10:00'));

    const result2 = getNextIntervalDate(baseDate, 3, intervalMap);
    expect(result2).toStrictEqual(new Date('2023-06-03T00:00:00'));

    const result3 = getNextIntervalDate(baseDate, 7, intervalMap);
    expect(result3).toStrictEqual(new Date('2023-06-15T00:00:00'));
  });

  it('should return the date with incremented year when count exceeds the range', () => {
    const result = getNextIntervalDate(baseDate, 12, intervalMap);
    expect(result).toStrictEqual(new Date('2024-06-01T00:00:00'));

    const result2 = getNextIntervalDate(baseDate, 15, intervalMap);
    expect(result2).toStrictEqual(new Date('2024-06-01T00:00:00'));
  });
});
