/**
 * 다음 풀이까지 남은 시간을 포멧팅하고 표시합니다.
 */
export function formatDate(
  submitDate: Date | string | number,
  stackCount: number,
  now = new Date()
) {
  const diff = Math.max(
    +getNextIntervalDate(new Date(submitDate), stackCount) - +now,
    0
  );

  if (diff === 0) return '지금';

  const diffInUnits: {
    value: number;
    unit: Intl.RelativeTimeFormatUnit;
  }[] = [
    { unit: 'second', value: 1 },
    { unit: 'minute', value: 60 },
    { unit: 'hour', value: 60 * 60 },
    { unit: 'day', value: 60 * 60 * 24 },
    { unit: 'week', value: 60 * 60 * 24 * 7 },
    { unit: 'month', value: 60 * 60 * 24 * 30.4375 }, // 평균 월 수 (365.25 / 12)
    { unit: 'quarter', value: 60 * 60 * 24 * 91.3125 }, // 평균 분기 수 (365.25 / 4)
    { unit: 'quarter', value: 60 * 60 * 24 * 182.625 }, // 평균 반년 수 (365.25 / 2)
    { unit: 'year', value: 60 * 60 * 24 * 365.25 },
  ];

  const formatter = new Intl.RelativeTimeFormat('ko');

  const duration = [60, 60, 24, 7, 4, 12, 4, 2];

  let idx = 0;

  while (idx < diffInUnits.length - 1 && getDiffValue(idx) >= duration[idx]) {
    idx += 1;
  }
  const diffValue = getDiffValue(idx);

  return formatter.format(diffValue, diffInUnits[idx].unit);

  function getDiffValue(idx: number) {
    return Math.floor(diff / (1000 * diffInUnits[idx].value));
  }
}

/**
 * 제출일과 맞은 횟수를 기준으로 다음 풀이까지 남은 시간을 구합니다.
 */
export function getNextIntervalDate(date: Date, count: number) {
  const newDate = new Date(date);

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

  if (count < 0) return newDate;

  if (count > intervalMap.length - 1) {
    newDate.setFullYear(newDate.getFullYear() + 1);
    return newDate;
  }

  newDate.setMinutes(newDate.getMinutes() + intervalMap[count]);

  return newDate;
}
