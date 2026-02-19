/**
 * Icon 카테고리
 * - CONTENT: 콘텐츠 관련 (미디어, 문서, 시간, 위치 등)
 * - ACTION: 동작 및 사용자 인터랙션 (사용자 동작, 내비게이션, UI 컨트롤 등)
 * - STATUS: 상태 및 알림 (상태 표시, 알림, 경고 등)
 * - BRAND: 브랜드 전용 (pop-ui 및 관련 브랜드 아이콘)
 * - SYSTEM: 시스템 및 설정 (시스템 기능, 사용자, 분석 등)
 */
export enum IconCategory {
  CONTENT = 'content',
  ACTION = 'action',
  STATUS = 'status',
  BRAND = 'brand',
  SYSTEM = 'system',
}

export const iconMetadata = {
  IconAnalytics: {
    categories: [IconCategory.SYSTEM],
    variants: ['line', 'filled'],
  },
  IconArrowLeft: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconArrowRight: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconBookmark: {
    categories: [IconCategory.ACTION],
    variants: ['line', 'filled'],
  },
  IconBrowse: {
    categories: [IconCategory.ACTION],
    variants: ['line', 'filled'],
  },
  IconCalendar: {
    categories: [IconCategory.CONTENT],
    variants: ['line', 'filled'],
  },
  IconCalendarCancel: {
    categories: [IconCategory.CONTENT],
    variants: ['line'],
  },
  IconCamera: {
    categories: [IconCategory.CONTENT],
    variants: ['line'],
  },
  IconCards: {
    categories: [IconCategory.CONTENT],
    variants: ['line'],
  },
  IconCaretDown: {
    categories: [IconCategory.ACTION],
    variants: ['filled'],
  },
  IconCaretUp: {
    categories: [IconCategory.ACTION],
    variants: ['filled'],
  },
  IconCaution: {
    categories: [IconCategory.STATUS],
    variants: ['line'],
  },
  IconCheck: {
    categories: [IconCategory.STATUS],
    variants: ['line'],
  },
  IconCheckCircle: {
    categories: [IconCategory.STATUS],
    variants: ['filled'],
  },
  IconChevronDown: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconChevronLeft: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconChevronRight: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconChevronRightDouble: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconChevronUp: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconClock: {
    categories: [IconCategory.CONTENT],
    variants: ['line'],
  },
  IconClose: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconCloseCircle: {
    categories: [IconCategory.STATUS],
    variants: ['filled'],
  },
  IconCopy: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconDev: {
    categories: [IconCategory.BRAND],
    variants: ['line'],
  },
  IconDirection: {
    categories: [IconCategory.CONTENT],
    variants: ['line'],
  },
  IconDragMenu: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconEdit: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconExport: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconFilter: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconHeart: {
    categories: [IconCategory.ACTION],
    variants: ['line', 'filled'],
  },
  IconHelp: {
    categories: [IconCategory.SYSTEM],
    variants: ['line'],
  },
  IconHome: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconInfo: {
    categories: [IconCategory.STATUS],
    variants: ['line'],
  },
  IconInfoCircle: {
    categories: [IconCategory.STATUS],
    variants: ['filled'],
  },
  IconKebap: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconLike: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconLink: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconListMenu: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconLocation: {
    categories: [IconCategory.CONTENT],
    variants: ['line'],
  },
  IconLocationTarget: {
    categories: [IconCategory.CONTENT],
    variants: ['line'],
  },
  IconMap: {
    categories: [IconCategory.CONTENT],
    variants: ['line'],
  },
  IconMapMarker: {
    categories: [IconCategory.CONTENT],
    variants: ['line', 'filled'],
  },
  IconMeatBall: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconMenu: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconMinus: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconMoney: {
    categories: [IconCategory.SYSTEM],
    variants: ['line'],
  },
  IconNote: {
    categories: [IconCategory.CONTENT],
    variants: ['line'],
  },
  IconNotification: {
    categories: [IconCategory.STATUS],
    variants: ['line', 'filled'],
  },
  IconPhone: {
    categories: [IconCategory.SYSTEM],
    variants: ['line'],
  },
  IconPhoneCall: {
    categories: [IconCategory.SYSTEM],
    variants: ['line'],
  },
  IconPhoto: {
    categories: [IconCategory.CONTENT],
    variants: ['line'],
  },
  IconPlus: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconPlusCircle: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconPopdeal: {
    categories: [IconCategory.BRAND],
    variants: ['line'],
  },
  IconQuestionCircle: {
    categories: [IconCategory.SYSTEM],
    variants: ['line'],
  },
  IconReport: {
    categories: [IconCategory.SYSTEM],
    variants: ['line'],
  },
  IconReset: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconSales: {
    categories: [IconCategory.SYSTEM],
    variants: ['line'],
  },
  IconSearch: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconSetting: {
    categories: [IconCategory.SYSTEM],
    variants: ['line'],
  },
  IconShare: {
    categories: [IconCategory.ACTION],
    variants: ['line', 'filled'],
  },
  IconSort: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconSound: {
    categories: [IconCategory.CONTENT],
    variants: ['line', 'filled'],
  },
  IconStar: {
    categories: [IconCategory.ACTION],
    variants: ['line', 'filled'],
  },
  IconStore: {
    categories: [IconCategory.SYSTEM],
    variants: ['line'],
  },
  IconTicket: {
    categories: [IconCategory.CONTENT],
    variants: ['line'],
  },
  IconTrash: {
    categories: [IconCategory.ACTION],
    variants: ['line'],
  },
  IconUser: {
    categories: [IconCategory.SYSTEM],
    variants: ['line', 'filled'],
  },
  IconWarning: {
    categories: [IconCategory.STATUS],
    variants: ['line'],
  },
  IconWarningCircle: {
    categories: [IconCategory.STATUS],
    variants: ['filled'],
  },
} as const;
