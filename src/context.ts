import { EpicState, RootState, ViewState } from "./types";
import { createContext } from "react";

export const EpicContext = createContext<EpicState>({
  changeStory: () => {},
});

export const RootContext = createContext<RootState>({
  changeView: () => {},
  viewParams: {},
});

export const ViewContext = createContext<ViewState>({
  go: () => {},
  goBack: () => {},
  params: {},

  showPopout: () => {},
  hidePopout: () => {},
});
