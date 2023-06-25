import ReactGA, { EventArgs, TrackerNames } from "react-ga";

const enabled = true; //disable when not ready;

export function initAnalytics() {
  if (!enabled) return;
  ReactGA.initialize("G-J5LZ8EB9SF");
  const pageView = window.location.pathname + window.location.search;
  console.log("analytics", { enabled: true, pageView: pageView });
  ReactGA.pageview(pageView);
}

export function sendAnalytics(args: EventArgs, trackerNames?: TrackerNames) {
  if (!enabled) return;
  console.log("analytics-send", { enabled: true, args: args });
  ReactGA.event(args, trackerNames);
}
