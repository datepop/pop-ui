---
'@pop-ui/core': patch
---

Component fonts now resolve through `var(--pop-ui-font-family, Pretendard)`, including Mantine's `--mantine-font-family`. Consumers that already ship their own Pretendard can set `--pop-ui-font-family` to reuse it instead of downloading the bundled `PretendardVariable.woff2`. When the variable is not set the fallback is `Pretendard`, so rendering is unchanged.
