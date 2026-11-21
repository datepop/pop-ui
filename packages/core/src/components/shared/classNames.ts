import type { MantineTheme } from '@mantine/core';

export type TMantineClassNameRecord<TStylesNames extends string> = Partial<
  Record<TStylesNames, string>
>;

export type TMantineClassNamesResolver<TStylesNames extends string, TProps> =
  | TMantineClassNameRecord<TStylesNames>
  | ((theme: MantineTheme, props: TProps, ctx: unknown) => TMantineClassNameRecord<TStylesNames>)
  | null;

export const mergeClassNamesWithDefault = <TStylesNames extends string, TProps>(
  defaultClassNames: TMantineClassNameRecord<TStylesNames>,
  classNames?: TMantineClassNamesResolver<TStylesNames, TProps>,
):
  | TMantineClassNameRecord<TStylesNames>
  | ((
      theme: MantineTheme,
      props: TProps,
      ctx: unknown,
    ) => TMantineClassNameRecord<TStylesNames>) => {
  // 객체 병합 헬퍼 함수
  const mergeObjects = (
    defaultClassNames: TMantineClassNameRecord<TStylesNames>,
    customClassNames: TMantineClassNameRecord<TStylesNames>,
  ): TMantineClassNameRecord<TStylesNames> => {
    // 1. defaultClassNames의 모든 키를 순회하여 병합
    const merged: TMantineClassNameRecord<TStylesNames> = Object.keys(defaultClassNames).reduce(
      (acc, key) => {
        const typedKey = key as TStylesNames;
        const defaultClass = defaultClassNames[typedKey];
        const customClass = customClassNames[typedKey];

        const mergedClass = [defaultClass, customClass].filter(Boolean).join(' ');
        if (mergedClass) {
          acc[typedKey] = mergedClass;
        }

        return acc;
      },
      {} as TMantineClassNameRecord<TStylesNames>,
    );

    Object.keys(customClassNames).forEach((key) => {
      const typedKey = key as TStylesNames;
      const customClass = customClassNames[typedKey];
      if (!(typedKey in defaultClassNames) && customClass) {
        merged[typedKey] = customClass;
      }
    });

    return merged;
  };

  if (typeof classNames === 'function') {
    return (theme: MantineTheme, props: TProps, ctx: unknown) =>
      mergeObjects(defaultClassNames, classNames(theme, props, ctx));
  }

  if (typeof classNames === 'object' && classNames !== null && !Array.isArray(classNames)) {
    return mergeObjects(defaultClassNames, classNames);
  }

  return defaultClassNames;
};
