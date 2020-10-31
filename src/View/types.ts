import { createContext, ReactNode } from "react";

// Navigation between Panels
export interface ViewState {
  /**
   * Go to another `Panel`
   *
   * @param panelId `Panel`'s ID
   * @param params Custom params to pass
   */
  go(panelId: string, params?: any): void;

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

export const ViewContext = createContext<ViewState>({
  go: () => {},
  goBack: () => {},
  params: {},

  showPopout: () => {},
  hidePopout: () => {},
});
