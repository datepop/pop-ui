---
'@pop-ui/foundation': major
'@pop-ui/core': patch
---

Rename the 43 `IconHotel…` exports on web and React Native. Remove `Hotel` from the import name. For `Calendar`, `Check`, `ChevronDown`, `ChevronRight` and `Report`, also append `Compact` to keep the original artwork (for example, `IconHotelCalendar` becomes `IconCalendarCompact`). Existing imports must be updated.

Align the clock face and hands with the 24 px Figma icon. Disable the TimePicker clock button on disabled and read-only inputs.
