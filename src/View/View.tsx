import React, { useState, ReactNode, useEffect } from "react";
import { View } from "@vkontakte/vkui";
import { ViewProps } from "@vkontakte/vkui/dist/components/View/View";

import { useHistory } from "../history";
import { ViewContext } from "./types";

// Props handled by vkui-navigation
type HandledProps = "activePanel" | "history" | "popout" | "onSwipeBack";

interface NavigatorViewProps extends Omit<ViewProps, HandledProps> {
  /**
   * Home `Panel`
   */
  homePanel: string;
}

/**
 * Wrapper around `View`
 */
const NavigatorView: React.FC<NavigatorViewProps> = ({
  homePanel,
  children,
  ...rest
}) => {
  const [popout, setPopout] = useState<ReactNode>(null);
  const { pushState, popState, history, lastPanel } = useHistory(homePanel);

  // Go to another panel
  const go = (id: string, params?: any) => {
    // Add panel to browser history
    pushState({
      id,
      params: params || {},
    });

    // Reset popout
    setPopout(null);
  };

  // Go to the previous panel
  const popHistory = () => {
    popState();

    // Reset popout
    setPopout(null);
  };

  // Set popouts
  const showPopout = (popout: ReactNode) => {
    setPopout(popout);
  };

  const hidePopout = () => {
    showPopout(null);
  };

  // History navigation (Android back button)
  useEffect(() => {
    window.history.replaceState({ id: homePanel, params: {} }, "");
    window.addEventListener("popstate", popHistory);

    // Clean up
    return () => {
      // Remove event handler
      window.removeEventListener("popstate", popHistory);
    };
  }, []); // eslint-disable-line

  // The code above is intentional

  return (
    <ViewContext.Provider
      value={{
        go,
        showPopout,
        hidePopout,
        goBack: window.history.back.bind(window.history),
        params: lastPanel.params,
      }}
    >
      <View
        {...rest}
        activePanel={lastPanel.id}
        history={history.map((entry) => entry.id)}
        popout={popout}
        onSwipeBack={popHistory}
      >
        {children}
      </View>
    </ViewContext.Provider>
  );
};

export { NavigatorView };
