import React, { ReactChildren, useState } from "react";
import bridge from "@vkontakte/vk-bridge";
import { Root } from "@vkontakte/vkui";
import { RootContext } from "./context";

interface RootProps {
  /**
   * Home `View`
   */
  homeView: string;

  /**
   * `onTransition` passed to `Root`
   */
  onTransition?(params: { isBack: boolean; from: string; to: string }): void;

  children: ReactChildren;
}

/**
 * Wrapper around `Root`
 */
function NavigatorRoot({ homeView, children, ...rest }: RootProps) {
  const [activeView, setActiveView] = useState(homeView);
  const [viewParams, setViewParams] = useState({});

  const changeView = (id: string, params: any) => {
    // Update
    setActiveView(id);
    setViewParams(params);

    // Do not allow to swipe back from newly created View
    bridge.send("VKWebAppDisableSwipeBack");
  };

  return (
    <RootContext.Provider
      value={{
        changeView,
        viewParams,
      }}
    >
      <Root activeView={activeView} {...rest}>
        {children}
      </Root>
    </RootContext.Provider>
  );
}

export { NavigatorRoot };
