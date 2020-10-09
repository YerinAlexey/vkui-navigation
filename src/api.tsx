import React, { useContext, useMemo } from "react";
import { EpicContext, RootContext, ViewContext } from "./context";
import { Navigator } from "./types";

/**
 * Hook to access `Navigator` object from a functional component
 */
export function useNavigator(): Navigator {
  const epicState = useContext(EpicContext);
  const rootState = useContext(RootContext);
  const viewState = useContext(ViewContext);

  const navigator = useMemo(
    () => ({
      ...epicState,
      ...rootState,
      ...viewState,
    }),
    [] // eslint-disable-line
  );

  return navigator;
}

/**
 * HOC to access `Navigator` object from props
 */
export function withNavigator<T>(Component: T): T {
  function WithNavigator(props: {}) {
    const navigator = useNavigator();

    // eslint-disable-next-line
    // @ts-ignore
    return <Component navigator={navigator} {...props} />;
  }

  return (WithNavigator as unknown) as T;
}
