---
'@pop-ui/foundation': patch
---

Finish the PDS v2.0 icon normalization for three icons that were missed. `IconStore` and `IconWarningCircle` are now backward-compatible aliases of the normalized `IconShop` and `IconCaution`, so `IconStore` also accepts `variant="filled"`, and the `IconWarningCircle` circle shrinks from r=10 to r=9 with the exclamation glyph following the caution geometry. `IconSmartphone` moves from a 24×26 canvas to a 24×24 canvas with a 20px-tall body.
