/**
 * Illustration 카테고리
 * - CONTENT: 콘텐츠 관련 (미디어, 문서, 위치, 등급 등)
 * - ACTION: 동작 및 사용자 인터랙션
 * - STATUS: 상태 및 알림 (알림, 메시지, 공지 등)
 * - BRAND: 브랜드 전용
 * - SYSTEM: 시스템 및 설정 (결제, 상거래, 매장 등)
 */
import type * as Illustrations from './index';

type TIllustrationName = keyof typeof Illustrations;

interface IIllustrationMetadataEntry {
  categories: IllustrationCategory[];
}

export enum IllustrationCategory {
  CONTENT = 'content',
  ACTION = 'action',
  STATUS = 'status',
  BRAND = 'brand',
  SYSTEM = 'system',
}

/**
 * Illustration 메타데이터
 * - categories: 의미 분류 체계
 */
export const illustrationMetadata: Record<TIllustrationName, IIllustrationMetadataEntry> = {
  IllustrationAge12: { categories: [IllustrationCategory.CONTENT] },
  IllustrationAge15: { categories: [IllustrationCategory.CONTENT] },
  IllustrationAge19: { categories: [IllustrationCategory.CONTENT] },
  IllustrationAgeAll: { categories: [IllustrationCategory.CONTENT] },
  IllustrationAlarm: { categories: [IllustrationCategory.STATUS] },
  IllustrationBell: { categories: [IllustrationCategory.STATUS] },
  IllustrationCalendar: { categories: [IllustrationCategory.CONTENT] },
  IllustrationCamera: { categories: [IllustrationCategory.CONTENT] },
  IllustrationChart: { categories: [IllustrationCategory.CONTENT] },
  IllustrationChat: { categories: [IllustrationCategory.CONTENT] },
  IllustrationCheckCircle: { categories: [IllustrationCategory.STATUS] },
  IllustrationClapperboard: { categories: [IllustrationCategory.CONTENT] },
  IllustrationClockHurry: { categories: [IllustrationCategory.STATUS] },
  IllustrationCoinWon: { categories: [IllustrationCategory.CONTENT] },
  IllustrationCreditcard: { categories: [IllustrationCategory.CONTENT] },
  IllustrationDiscountcoupon: { categories: [IllustrationCategory.CONTENT] },
  IllustrationDiscounttagMint: { categories: [IllustrationCategory.CONTENT] },
  IllustrationDiscounttagPurple: { categories: [IllustrationCategory.CONTENT] },
  IllustrationDiscounttagRed: { categories: [IllustrationCategory.CONTENT] },
  IllustrationExel: { categories: [IllustrationCategory.CONTENT] },
  IllustrationFolder: { categories: [IllustrationCategory.CONTENT] },
  IllustrationHandOk: { categories: [IllustrationCategory.STATUS] },
  IllustrationHandThumbsUp: { categories: [IllustrationCategory.STATUS] },
  IllustrationHome: { categories: [IllustrationCategory.CONTENT] },
  IllustrationLink: { categories: [IllustrationCategory.ACTION] },
  IllustrationMappinMint: { categories: [IllustrationCategory.CONTENT] },
  IllustrationMappinRed: { categories: [IllustrationCategory.CONTENT] },
  IllustrationMegaphone: { categories: [IllustrationCategory.STATUS] },
  IllustrationMoneybag: { categories: [IllustrationCategory.CONTENT] },
  IllustrationNoCircle: { categories: [IllustrationCategory.STATUS] },
  IllustrationOffice: { categories: [IllustrationCategory.CONTENT] },
  IllustrationPeople: { categories: [IllustrationCategory.CONTENT] },
  IllustrationPerson: { categories: [IllustrationCategory.CONTENT] },
  IllustrationPopcorn: { categories: [IllustrationCategory.CONTENT] },
  IllustrationPopdeal: { categories: [IllustrationCategory.CONTENT] },
  IllustrationPoppass: { categories: [IllustrationCategory.CONTENT] },
  IllustrationSales: { categories: [IllustrationCategory.CONTENT] },
  IllustrationSetting: { categories: [IllustrationCategory.CONTENT] },
  IllustrationShop: { categories: [IllustrationCategory.CONTENT] },
  IllustrationShoppingbag: { categories: [IllustrationCategory.CONTENT] },
  IllustrationSoda: { categories: [IllustrationCategory.CONTENT] },
  IllustrationTicket: { categories: [IllustrationCategory.CONTENT] },
  IllustrationVendingmachine: { categories: [IllustrationCategory.CONTENT] },
  IllustrationYesCircle: { categories: [IllustrationCategory.STATUS] },
  IllustrationYesSpike: { categories: [IllustrationCategory.STATUS] },
  IllustrationYoutube: { categories: [IllustrationCategory.CONTENT] },
};
