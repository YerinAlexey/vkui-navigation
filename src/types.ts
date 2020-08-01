import { ReactNode } from "react";

// History entry for View
export interface HistoryEntry {
  /**
   * `Panel`'s `id`
   */
  id: string;

  /**
   * Params
   */
  params: any;
}

// Navigation between Views
export interface RootState {
  /**
   * Go to another `View`
   *
   * @param viewId `id` of target `View`
   * @param params Custom params to pass
   */
  changeView(viewId: string, params: any): void;

  /**
   * Params passed via `params` in `goPage`
   */
  viewParams: any;
}

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
   * Go to previous `Panel`
   */
  goBack(): void;

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

/**
 * Global object used for navigation
 */
export interface Navigator extends RootState, ViewState {}
