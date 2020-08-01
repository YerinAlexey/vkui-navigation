import React, { useState, ReactChildren, useMemo, ReactNode } from "react";
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

  children: ReactChildren;
}

function NavigatorView({ id, homePanel, children }: ViewProps) {
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
    // Push
    setHistory((hist) => [
      ...hist,
      {
        id,
        params,
      },
    ]);

    // Enable Swipe Back
    bridge.send("VKWebAppEnableSwipeBack");
  };

  // Go to the previous panel
  const goBack = () => {
    // Update history
    setHistory((hist) => hist.slice(0, hist.length - 2));

    // If on home panel, disable swipe back
    if (history[history.length - 2].id === homePanel) {
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

  return (
    <ViewContext.Provider
      value={{
        go,
        goBack,
        params: lastPanel.params,
        showPopout,
        hidePopout,
      }}
    >
      <View
        id={id}
        activePanel={lastPanel.id}
        history={history.map((entry) => entry.id)}
        popout={popout}
        onSwipeBack={goBack}
      >
        {children}
      </View>
    </ViewContext.Provider>
  );
}

export { NavigatorView };
