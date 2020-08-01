import { ReactNode, createContext } from "react";

// Navigation between Views
export interface RootState {
  /**
   * Go to another `View`
   *
   * @param viewId `id` of target `View`
   * @param params Custom params to pass
   */
  goView(viewId: string, params: any): void;

  /**
   * Params passed via `params` in `goPage`
   */
  viewParams: any;
}

export const RootContext = createContext<RootState>({
  goView: () => {},
  viewParams: {},
});

// Navigation between Panels
export interface ViewState {
  /**
   * Go to another `Panel`
   *
   * @param panelId `id` of target `Panel`
   * @param params Custom params to pass
   */
  go(panelId: string, params: any): void;

  /**
   * Params passed via `params` in `go`
   */
  params: any;

  /**
   * Set popout
   */
  showPopout(poput: ReactNode): void;

  /**
   * Alias for `showPopout(null)`
   */
  hidePopout(): void;
}

export const ViewContext = createContext<ViewState>({
  go: () => {},
  params: {},

  showPopout: () => {},
  hidePopout: () => {},
});

/**
 * Global object used for navigation
 */
export interface Navigator extends RootState, ViewState {}
