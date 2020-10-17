import React, { useState, useMemo, ReactNode, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import { View } from "@vkontakte/vkui";
import { ViewProps } from "@vkontakte/vkui/dist/components/View/View";

import { ViewContext, HistoryEntry } from "./types";

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
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      id: homePanel,
      params: {},
    },
  ]);
  const [popout, setPopout] = useState<ReactNode>(null);

  // Get last panel from history
  const lastPanel = useMemo(() => history[history.length - 1], [history]);

  // Go to another panel
  const go = (id: string, params?: any) => {
    const entry = {
      id,
      params: params || {},
    };

    // Push
    setHistory((hist) => [...hist, entry]);

    // Enable Swipe Back
    bridge.send("VKWebAppEnableSwipeBack");

    // Add panel to browser history
    window.history.pushState(entry, "");

    // Reset popout
    setPopout(null);
  };

  // Go to the previous panel
  const popHistory = () => {
    // Update history
    setHistory((hist) =>
      hist.length > 1 ? hist.slice(0, hist.length - 1) : hist
    );

    // If on home panel, disable swipe back
    if (history[history.length - 1].id === homePanel) {
      bridge.send("VKWebAppDisableSwipeBack");
    }

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
