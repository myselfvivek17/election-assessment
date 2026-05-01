import { logEvent } from "firebase/analytics";
import { initAnalytics } from "./config";

export const logCustomEvent = async (eventName: string, params?: Record<string, any>) => {
  try {
    const analytics = await initAnalytics();
    if (analytics) {
      logEvent(analytics, eventName, params);
    }
  } catch (error) {
    console.error("Firebase Analytics Error:", error);
  }
};

export const logLanguageSwitch = (from: string, to: string) => {
  logCustomEvent("language_switch", { from_lang: from, to_lang: to });
};

export const logChatStart = () => {
  logCustomEvent("chat_started");
};

export const logBoothSearch = (query: string) => {
  logCustomEvent("booth_search", { query });
};
