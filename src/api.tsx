import React, { useContext, useMemo, ReactNode } from "react";
import { RootContext, ViewContext } from "./context";
import { Navigator } from "./types";

/**
 * Hook to inject `Navigator` object
 */
export function useNavigator(): Navigator {
  const rootState = useContext(RootContext);
  const viewState = useContext(ViewContext);

  const navigator = useMemo(
    () => ({
      ...rootState,
      ...viewState,
    }),
    []
  );

  return navigator;
}

/**
 * HOC to inject `Navigator` to props
 */
export function withNavigator<T>(Component: T): T {
  function WithNavigator(props: {}) {
    const navigator = useNavigator();

    // @ts-ignore
    return <Component navigator={navigator} {...props} />;
  }

  return (WithNavigator as unknown) as T;
}
