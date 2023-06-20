/**
 * 다음 풀이까지 남은 시간을 포멧팅하고 표시합니다.
 */
export function formatDate(
  submitDate: Date | string | number,
  stackCount: number,
  now = new Date()
) {
  const diff = Math.max(
    +intervalDate(new Date(submitDate), stackCount) - +now,
    0
  );

  if (diff === 0) {
    return '지금';
  }

  const diffInSeconds = Math.floor(diff / 1000);
  const diffInMinutes = Math.floor(diff / (1000 * 60));
  const diffInHours = Math.floor(diff / (1000 * 60 * 60));
  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  const diffInMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.4375)); // 평균 월 수 (365.25 / 12)
  const diffInQuarters = Math.floor(diff / (1000 * 60 * 60 * 24 * 91.3125)); // 평균 분기 수 (365.25 / 4)
  const diffInHalfYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 182.625)); // 평균 반년 수 (365.25 / 2)
  const diffInFullYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

  const formatter = new Intl.RelativeTimeFormat('ko');

  if (diffInSeconds < 60) {
    return formatter.format(diffInSeconds, 'second');
  } else if (diffInMinutes < 60) {
    return formatter.format(diffInMinutes, 'minute');
  } else if (diffInHours < 24) {
    return formatter.format(diffInHours, 'hour');
  } else if (diffInDays < 7) {
    return formatter.format(diffInDays, 'day');
  } else if (diffInWeeks < 4) {
    return formatter.format(diffInWeeks, 'week');
  } else if (diffInMonths < 12) {
    return formatter.format(diffInMonths, 'month');
  } else if (diffInQuarters < 4) {
    return formatter.format(diffInQuarters, 'quarter');
  } else if (diffInHalfYears < 2) {
    return formatter.format(diffInHalfYears, 'quarter');
  } else {
    return formatter.format(diffInFullYears, 'years');
  }
}

/**
 * 제출일과 맞은 횟수를 기준으로 다음 풀이까지 남은 시간을 구합니다.
 */
export function intervalDate(date: Date, count: number) {
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

  if (count > 11) {
    newDate.setFullYear(newDate.getFullYear() + 1);
    return newDate;
  }

  newDate.setMinutes(newDate.getMinutes() + intervalMap[count]);

  return newDate;
}
