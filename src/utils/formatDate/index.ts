import { intervalMap } from '@/constant/config';

/**
 * - 읽기 전용 배열
 * - 1회 계산만을 위해 모듈 스코프에서 정의하고 그 외 상황에서는 참조만 할 것
 */
const diffInUnits: {
  value: number;
  unit: Intl.RelativeTimeFormatUnit;
}[] = [
  { unit: 'second', value: 1 },
  { unit: 'minute', value: 60 },
  { unit: 'hour', value: 3600 }, // 60 * 60
  { unit: 'day', value: 86400 }, // 60 * 60 * 24
  { unit: 'week', value: 604800 }, // 60 * 60 * 24 * 7
  { unit: 'month', value: 2629800 }, // 60 * 60 * 24 * 30.4375 -> 평균 월 수 (365.25 / 12)
  { unit: 'quarter', value: 7889400 }, // 60 * 60 * 24 * 91.3125 -> 평균 분기 수 (365.25 / 4)
  { unit: 'quarter', value: 15778800 }, // 60 * 60 * 24 * 182.625 -> 평균 반년 수 (365.25 / 2)
  { unit: 'year', value: 31557600 }, // 60 * 60 * 24 * 365.25
];
Object.freeze(diffInUnits);

/** 다음 풀이까지 남은 시간을 포멧팅하고 표시 */
export function formatDate(
  submitDate: Date | string | number,
  stackCount: number,
  now = new Date()
) {
  const diff = calDiffBetweenNowFromNextInterval(submitDate, stackCount, now);

  if (diff === 0) return '지금';

  const formatter = new Intl.RelativeTimeFormat('ko');

  const nextInterval = [60, 60, 24, 7, 4, 12, 4, 2];

  let idx = 0;

  while (
    idx < diffInUnits.length - 1 &&
    getDiffValue(idx) >= nextInterval[idx]
  ) {
    idx += 1;
  }
  const diffValue = getDiffValue(idx);

  return formatter.format(diffValue, diffInUnits[idx].unit);

  function getDiffValue(idx: number) {
    return Math.floor(diff / (1000 * diffInUnits[idx].value));
  }
}

/** 현재와 다음에 풀어야 하는 시점까지 차이를 구함 */
export function calDiffBetweenNowFromNextInterval(
  submitDate: Date | string | number,
  stackCount: number,
  now = new Date()
) {
  return Math.max(
    +getNextIntervalDate(new Date(submitDate), stackCount, intervalMap) - +now,
    0
  );
}

/** 제출일과 맞은 횟수를 기준으로 다음에 풀어야 할 시간과 날짜를 구함 */
export function getNextIntervalDate(
  date: Date,
  count: number,
  intervalMap: Int32Array
) {
  const newDate = new Date(date);

  if (count < 0) return newDate;

  if (count > intervalMap.length - 1) {
    newDate.setFullYear(newDate.getFullYear() + 1);
    return newDate;
  }

  newDate.setMinutes(newDate.getMinutes() + intervalMap[count]);

  return newDate;
}
