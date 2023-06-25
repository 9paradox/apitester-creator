import ReactGA from "react-ga4";
import { UaEventOptions } from "react-ga4/types/ga4";

const enabled = true; //disable when not ready;

export function initAnalytics() {
  if (!enabled) return;
  ReactGA.initialize("G-J5LZ8EB9SF");
  const pageView = window.location.pathname + window.location.search;
  console.log("analytics", { enabled: true, pageView: pageView });
  ReactGA.send({ hitType: "pageview", page: pageView });
}

export function sendAnalytics(args: UaEventOptions) {
  if (!enabled) return;
  console.log("analytics-send", { enabled: true, args: args });
  ReactGA.event(args);
}
