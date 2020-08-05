import React, { useState } from "react";
import bridge from "@vkontakte/vk-bridge";
import { Root } from "@vkontakte/vkui";
import { RootContext } from "./context";
import { RootProps } from "@vkontakte/vkui/dist/components/Root/Root";

type HandledProps = "activeView";

interface NavigatorRootProps extends Omit<RootProps, HandledProps> {
  /**
   * Home `View`
   */
  homeView: string;
}

/**
 * Wrapper around `Root`
 */
const NavigatorRoot: React.FC<NavigatorRootProps> = ({
  homeView,
  children,
  ...rest
}) => {
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
};

export { NavigatorRoot };
