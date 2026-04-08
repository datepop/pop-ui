export type TDateDisplayType = 'default' | 'multiple' | 'range';

/**
 * 지원 토큰 (정규식 alternation 순서 = 우선순위: 긴 것 먼저)
 * YYYY: 4자리 연도,  YY: 2자리 연도
 * MM: 0패딩 월,     M: 패딩 없는 월
 * DD: 0패딩 일,     D: 패딩 없는 일
 * HH: 0패딩 시,     mm: 0패딩 분,  ss: 0패딩 초
 */
const FORMAT_TOKEN_RE = /YYYY|YY|MM|M|DD|D|HH|mm|ss/g;

/** 포맷 토큰 → Date 값 치환 (정규식으로 한 번에 처리해 이중 치환 방지) */
const applyFormat = (date: Date, format: string): string =>
  format.replace(FORMAT_TOKEN_RE, (token) => {
    switch (token) {
      case 'YYYY':
        return String(date.getFullYear());
      case 'YY':
        return String(date.getFullYear()).slice(-2);
      case 'MM':
        return String(date.getMonth() + 1).padStart(2, '0');
      case 'M':
        return String(date.getMonth() + 1);
      case 'DD':
        return String(date.getDate()).padStart(2, '0');
      case 'D':
        return String(date.getDate());
      case 'HH':
        return String(date.getHours()).padStart(2, '0');
      case 'mm':
        return String(date.getMinutes()).padStart(2, '0');
      case 'ss':
        return String(date.getSeconds()).padStart(2, '0');
      default:
        return token;
    }
  });

/** 토큰별 파싱용 named capture group 패턴 */
const TOKEN_PARSE_PATTERN: Record<string, string> = {
  YYYY: '(?<YYYY>\\d{4})',
  YY: '(?<YY>\\d{2})',
  MM: '(?<MM>\\d{2})',
  M: '(?<M>\\d{1,2})',
  DD: '(?<DD>\\d{2})',
  D: '(?<D>\\d{1,2})',
};

/** 포맷 문자열 → 파싱 정규식 생성 (리터럴 구간은 escape, 토큰은 capture group으로 변환) */
const buildParseRegex = (format: string): RegExp => {
  const parts: string[] = [];
  const tokenRe = /YYYY|YY|MM|M|DD|D/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRe.exec(format)) !== null) {
    const literal = format.slice(lastIndex, match.index);
    if (literal) parts.push(literal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    parts.push(TOKEN_PARSE_PATTERN[match[0]]);
    lastIndex = tokenRe.lastIndex;
  }

  const tail = format.slice(lastIndex);
  if (tail) parts.push(tail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  return new RegExp(`^${parts.join('')}$`);
};

/** 포맷 문자열 → Date 파싱 */
const parseWithFormat = (value: string, format: string): Date | null => {
  const result = buildParseRegex(format).exec(value);
  if (!result?.groups) return null;

  const { YYYY, YY, MM, M, DD, D } = result.groups;

  const year =
    YYYY !== undefined ? parseInt(YYYY, 10) : YY !== undefined ? 2000 + parseInt(YY, 10) : NaN;
  const month = parseInt(MM ?? M, 10);
  const day = parseInt(DD ?? D, 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  const d = new Date(year, month - 1, day);
  if (d.getFullYear() !== year || d.getMonth() + 1 !== month || d.getDate() !== day) return null;
  return d;
};

/** 내부 Date 값 → 입력창 표시 문자열 */
export const formatDateDisplay = (
  value: Date | Date[] | [Date | null, Date | null] | null | undefined,
  type: TDateDisplayType,
  format: string,
): string => {
  if (!value) return '';
  if (type === 'range' && Array.isArray(value)) {
    const [start, end] = value as [Date | null, Date | null];
    if (!start) return '';
    return end
      ? `${applyFormat(start, format)} ~ ${applyFormat(end, format)}`
      : applyFormat(start, format);
  }
  if (type === 'multiple' && Array.isArray(value)) {
    return (value as Date[])
      .filter(Boolean)
      .map((d) => applyFormat(d, format))
      .join(', ');
  }
  return value instanceof Date ? applyFormat(value, format) : '';
};

/** 내부 Date 값 → onChange 출력 문자열 */
export const toValueString = (
  value: Date | Date[] | [Date | null, Date | null] | null | undefined,
  type: TDateDisplayType,
  format: string,
): string | null | string[] | [string | null, string | null] => {
  if (type === 'range' && Array.isArray(value)) {
    const [start, end] = value as [Date | null, Date | null];
    return [start ? applyFormat(start, format) : null, end ? applyFormat(end, format) : null] as [
      string | null,
      string | null,
    ];
  }
  if (type === 'multiple' && Array.isArray(value)) {
    return (value as Date[]).filter(Boolean).map((d) => applyFormat(d, format));
  }
  return value instanceof Date ? applyFormat(value, format) : null;
};

/** 문자열 value → 내부 Date 변환 (value prop 수신 시) */
export const parseDateValue = (
  value: string | null | string[] | [string | null, string | null] | undefined,
  type: TDateDisplayType,
  format: string,
): Date | null | Date[] | [Date | null, Date | null] => {
  if (value == null) {
    return type === 'range' ? [null, null] : type === 'multiple' ? [] : null;
  }
  if (type === 'range' && Array.isArray(value)) {
    const [s, e] = value as [string | null, string | null];
    return [s ? parseWithFormat(s, format) : null, e ? parseWithFormat(e, format) : null] as [
      Date | null,
      Date | null,
    ];
  }
  if (type === 'multiple' && Array.isArray(value)) {
    return (value as string[])
      .map((v) => parseWithFormat(v, format))
      .filter((d): d is Date => d !== null);
  }
  if (typeof value === 'string') {
    return parseWithFormat(value, format);
  }
  return null;
};
