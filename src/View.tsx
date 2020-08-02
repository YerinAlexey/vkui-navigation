import React, { useState, useMemo, ReactNode, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import { View } from "@vkontakte/vkui";
import { ViewContext } from "./context";
import { HistoryEntry } from "./types";

interface ViewProps {
  /**
   * `View`'s ID
   */
  id: string;

  /**
   * Home `Panel`
   */
  homePanel: string;
}

const NavigatorView: React.FC<ViewProps> = ({ id, homePanel, children }) => {
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
  const go = (id: string, params: any) => {
    const entry = {
      id,
      params,
    };

    // Push
    setHistory((hist) => [...hist, entry]);

    // Enable Swipe Back
    bridge.send("VKWebAppEnableSwipeBack");

    // Add panel to browser history
    window.history.pushState(entry, "");
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
  }, []);

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
        id={id}
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
