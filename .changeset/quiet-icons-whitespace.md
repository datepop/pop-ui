---
'@pop-ui/foundation': patch
---

Remove stray whitespace string children from icon SVGs so the generated React Native icons no longer render a raw text node inside `<Svg>`. Restore the plain `IconCart` without a check mark and normalize `IconCartCheck` to the same cart body with the check mark.
