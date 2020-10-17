import React, { useState, ReactNode, useMemo } from "react";
import { Epic, Tabbar, TabbarItem } from "@vkontakte/vkui";
import { EpicProps } from "@vkontakte/vkui/dist/components/Epic/Epic";
import { TabbarItemProps } from "@vkontakte/vkui/dist/components/TabbarItem/TabbarItem";

import { EpicContext } from "./types";

interface NavigatorEpicProps extends Omit<EpicProps, "activeStory" | "tabbar"> {
  /**
   * Default story (`View` or `Root`'s ID)
   */
  homeStory: string;

  /**
   * `Tabbar` defenition
   */
  tabbar: NavigatorTabbar;
}

/**
 * Defenition of the tab in `Tabbar`
 */
interface NavigatorTabbarItem
  extends Omit<TabbarItemProps, "selected" | "onClick"> {
  /**
   * Icon to place alongside the text
   */
  icon: ReactNode;

  /**
   * Story that this item belongs to
   */
  story: string;
}

/**
 * Defenition of the `Tabbar`
 */
type NavigatorTabbar = NavigatorTabbarItem[];

type TabbarOnChange = (story: string) => void;

/**
 * Build an actual `Tabbar` from the defenition
 */
const buildTabbar = (
  tabbar: NavigatorTabbar,
  selectedStory: string,
  onChange: TabbarOnChange
) => {
  return (
    <Tabbar>
      {tabbar.map(({ icon, story, ...rest }, index) => (
        <TabbarItem
          {...rest}
          key={index}
          selected={selectedStory === story}
          onClick={() => {
            onChange(story);
          }}
        >
          {icon}
        </TabbarItem>
      ))}
    </Tabbar>
  );
};

/**
 * Wrapper around `Epic`
 */
const NavigatorEpic: React.FC<NavigatorEpicProps> = ({
  homeStory,
  tabbar,
  children,
  ...rest
}) => {
  const [tabbarVisibility, setTabbarVisibility] = useState(true);
  const [story, setStory] = useState(homeStory);

  // Build tabbar
  const builtTabbar = useMemo(() => buildTabbar(tabbar, story, setStory), [
    tabbar,
    story,
    setStory,
  ]);

  return (
    <EpicContext.Provider
      value={{ changeStory: setStory, setTabbarVisibility }}
    >
      <Epic
        {...rest}
        activeStory={story}
        tabbar={tabbarVisibility ? builtTabbar : null}
      >
        {children}
      </Epic>
    </EpicContext.Provider>
  );
};

export { NavigatorEpic };
