# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-01-22

### ✨ Added

- **IconCaution**: 새로운 경고 아이콘 추가
- **IconInfo**: 새로운 정보 아이콘 추가

### 🔄 Changed

- **아이콘 이름 변경**: 명확성을 위해 일부 아이콘 이름 변경
  - `IconUp` → `IconCaretUp`
  - `IconDown` → `IconCaretDown`
- **오타 수정**: `IconMetaBall` → `IconMeatBall`

### 🔄 Internal Changes

아이콘 시스템 내부 구조를 개선했습니다. API는 이전 버전과 100% 호환됩니다.

- 아이콘 폴더 구조 개편 (flat → 아이콘별 폴더)
  - 기존: `icons/IconCalendar.tsx`
  - 신규: `icons/calendar/Calendar.tsx`
  - Export 구조는 동일하게 유지
- 코드 구조 개선으로 유지보수성 향상
- 향후 다양한 아이콘 스타일 추가 준비

### 💡 Usage (동일)

```tsx
import { IconCalendar, IconStar } from '@pop-ui/foundation'

// Line 스타일 (기본)
<IconCalendar />

// Filled 스타일 (filled prop 사용)
<IconCalendar filled />
```

---

## [0.0.33] - 2026-01-21

Previous versions

