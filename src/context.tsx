import { RootState, ViewState } from "./types";
import { createContext } from "react";

export const RootContext = createContext<RootState>({
  goView: () => {},
  viewParams: {},
});

export const ViewContext = createContext<ViewState>({
  go: () => {},
  params: {},

  showPopout: () => {},
  hidePopout: () => {},
});
