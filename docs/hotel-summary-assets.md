# Hotel Summary assets

These resources reproduce existing Datepop source assets. They are not newly drawn approximations. The complete source paths, immutable revisions and SHA-256 checksums are recorded in [the source inventory](./hotel-summary-assets.sources.json).

## Icons

Import the named `IconHotel*` components from `@pop-ui/foundation`. They accept the existing `size`, `color` and SVG properties. Their original path data, view boxes, grouping and opacity are retained. `IconHotelFooterFavorite` exposes `variant="line"` (original off) and `variant="filled"` (original on). Other icons expose the original single appearance through the standard `line` variant.

Android resources come from `datepop/datepop-android` at `06a9ac7df065775c5a9748ee80c71d068e89e097`. The eighteen facility resources come from the existing inhouse design system exports at `dbb0f4ef1f698f1901d714332d716bd31300e7a4`. Seventeen are added as `IconHotelFacility*`. Parking reuses `IconParking size={20}`: its 24-unit geometry scales to the original 20-unit design. The original SVG export rounds equivalent path coordinates at different precision.

`IconHotelPin`, `IconHotelSummaryMap` and `IconHotelFooterFavorite` retain their non-square source aspect ratios. Their `size` determines width; height follows the original ratio. Callers that need a square image slot should center the icon in that slot. The generic existing `IconHeart`, `IconMap` and circular `IconNaver` have different artwork and cannot replace these original resources.

The existing native generator also produces the icon components for React Native. No Android application source was changed.

## Raster images

The web-only `hotelSummaryImages` catalog exports `favoriteOn`, `favoriteOff` and `mapSample` URLs. The favorite images contain the original hero bubble and shadow and are displayed in Android at 75 logical pixels. Binary files are copied without modification.

`mapSample` is explicitly a sample illustration. It must not represent an actual map or substitute for missing coordinates. A consumer with no location must show its unset state. The catalog is intentionally absent from the React Native entry point; native consumers use their original platform resources.

The first-party icon and favorite artwork retains the repository's Tenfingers license. `mapSample` is an existing map screenshot from the Android repository; its embedded map-provider attribution must remain intact, and this package does not grant a new license to the provider's map content. The inventory records repository provenance rather than claiming ownership of third-party map data.

## Fonts

Import `@pop-ui/core/styles.css`. This registers the scoped CSS aliases `Pop UI Hotel Noto Sans KR` and `Pop UI Hotel Montserrat`, each at weights 500, 600 and 700. It does not change any global font family, existing Pretendard face or consumer typography. These scoped aliases avoid affecting consumers that already register the ordinary Noto/Montserrat family names. For example, a hotel price can use `font-family: 'Pop UI Hotel Montserrat', sans-serif; font-weight: 600`. Internal font names and metadata remain unchanged.

The original Android TTFs are losslessly compressed into WOFF2 using fonttools 4.60.2, with `recalcBBoxes=False`, `recalcTimestamp=False` and no subsetting. The [font manifest](../packages/core/src/components/shared/hotel-fonts/manifest.json) records source/output checksums and verification: every glyph outline, glyph order, character map, and the name, hmtx, OS/2, GSUB and GPOS tables remain unchanged. Compression therefore preserves the original reserved font names. See [OFL FAQ 2.2.1](https://openfontlicense.org/ofl-faq/).

Both families use SIL Open Font License 1.1. Their complete notices are stored beside the fonts as `OFL-NotoSansKR.txt` and `OFL-Montserrat.txt` and copied into the distributed assets folder. Noto retains Adobe's 2014–2021 copyright and reserved name notice. Montserrat retains the source font's 2011 project copyright. The repository's MIT license does not replace these font licenses.

Android `HotelFonts` explicitly uses these families. `GeneralSpotDetailText` is a separate Android `Typeface.DEFAULT` path (normal/bold, `includeFontPadding=true`, zero letter spacing); these resources do not imply that it should use Noto. Browser system font fallback and Android font padding have different metrics and require separate consumer verification.

## Distribution verification

Vite library builds inline font data. The font copy plugin now maps each embedded byte sequence to its matching source filename, copies all font files and OFL notices, and rejects duplicate names or unmatched font data. Existing Pretendard retains `./assets/PretendardVariable.woff2`; each additional face retains its own URL. Release preparation must build foundation and core, verify the copied font checksums and CSS URLs, then follow the repository README release/Chromatic/main/tag deployment process. Adding this changeset does not publish a package.
