import { createContext } from "react";

// Navigation between Views
export interface RootState {
  /**
   * Go to another `View`
   *
   * @param viewId `View`'s ID
   * @param params Custom params to pass
   */
  changeView(viewId: string, params?: any): void;

  /**
   * Params passed via `params` in `changeView`
   */
  viewParams: any;
}

export const RootContext = createContext<RootState>({
  changeView: () => {},
  viewParams: {},
});
