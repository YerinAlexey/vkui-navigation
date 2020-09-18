import React, { useState, ReactNode, useMemo } from "react";
import { Epic, Tabbar, TabbarItem } from "@vkontakte/vkui";
import { TabbarItemProps } from "@vkontakte/vkui/dist/components/TabbarItem/TabbarItem";

interface EpicProps {
  /**
   * `id` property if you want to use Epic in Root
  */
  id?: string;
  
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
