import { createContext } from "react";

// Navigation inside Epic
export interface EpicState {
  /**
   * Change `Epic`'s story
   *
   * @param storyId Story ID to go to
   */
  changeStory: (storyId: string) => void;

  /**
   * Change `Tabbar` visibility
   *
   * @param visible Hide or show the `Tabbar`
   */
  setTabbarVisibility: (visible: boolean) => void;
}

export const EpicContext = createContext<EpicState>({
  changeStory: () => {},
  setTabbarVisibility: () => {},
});
