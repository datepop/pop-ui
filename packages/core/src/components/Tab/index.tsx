'use client'

import { Tabs, TabsProps } from "@mantine/core";
import styles from "./styles.module.scss";
import { ReactNode } from "react";

export interface TabProps extends TabsProps {
  tabList: {
    title: string;
    value: string;
    body: ReactNode;
    icon?: ReactNode;
  }[];
  containerPaddingTop?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const Tab = ({
  tabList = [],
  containerPaddingTop,
  ...props
}: TabProps) => {
  return (
    <Tabs {...props}>
      <Tabs.List className={styles["Tab__TitleList"]}>
        {tabList?.map((tab, index) => (
          <Tabs.Tab key={`tab_${index}`} value={tab.value} leftSection={tab.icon}>
            {tab.title}
            <div className={styles["Tab__BorderBottom"]} />
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {tabList?.map((tab, index) => (
        <Tabs.Panel
          key={`tab_panel_${index}`}
          value={tab.value}
          pt={containerPaddingTop}
        >
          {tab.body}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export default Tab;
