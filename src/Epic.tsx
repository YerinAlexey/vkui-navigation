import React, { useState, ReactNode, useMemo } from "react";
import { Epic, Tabbar, TabbarItem } from "@vkontakte/vkui";
import { TabbarItemProps } from "@vkontakte/vkui/dist/components/TabbarItem/TabbarItem";

interface EpicProps {
  /**
   * Default story (`View` or `Root`'s ID)
   */
  homeStory: string;

  /**
   * `Tabbar` defenition
   */
  tabbar: NavigatorTabbar;
}

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
          key={index}
          selected={selectedStory === story}
          onClick={() => {
            onChange(story);
          }}
          {...rest}
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
const NavigatorEpic: React.FC<EpicProps> = ({
  homeStory,
  tabbar,
  children,
}) => {
  const [story, setStory] = useState(homeStory);

  // Build tabbar
  const builtTabbar = useMemo(() => buildTabbar(tabbar, story, setStory), [
    story,
    setStory,
  ]);

  return (
    <Epic activeStory={story} tabbar={builtTabbar}>
      {children}
    </Epic>
  );
};

export { NavigatorEpic };
