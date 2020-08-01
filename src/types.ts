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
   * @param viewId `View`'s ID
   * @param params Custom params to pass
   */
  changeView(viewId: string, params: any): void;

  /**
   * Params passed via `params` in `changeView`
   */
  viewParams: any;
}

// Navigation between Panels
export interface ViewState {
  /**
   * Go to another `Panel`
   *
   * @param panelId `Panel`'s ID
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
