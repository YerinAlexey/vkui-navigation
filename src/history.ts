/**
 * History management
 */

import bridge from "@vkontakte/vk-bridge";
import { useState } from "react";

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

interface UseHistoryState {
  pushState: (entry: HistoryEntry) => void;
  popState: () => void;
  history: HistoryEntry[];
}

export const useHistory = (homePanel: string): UseHistoryState => {
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      id: homePanel,
      params: {},
    },
  ]);

  const pushState = (entry: HistoryEntry) => {
    // Save entry in the internal state
    setHistory((hist) => [...hist, entry]);

    // Enable Swipe Back
    bridge.send("VKWebAppEnableSwipeBack");

    // Add panel to browser history
    window.history.pushState(entry, "");
  };

  const popState = () => {
    // If history is only one entry long, do nothing
    // Otherwise, pop the last element
    setHistory((hist) =>
      hist.length > 1 ? hist.slice(0, hist.length - 1) : hist
    );

    // If on home panel, disable swipe back
    if (history[history.length - 1].id === homePanel) {
      bridge.send("VKWebAppDisableSwipeBack");
    }
  };

  return { pushState, popState, history };
};
