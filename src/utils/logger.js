export const logEvent = (event, details) => {
  const log = {
    timestamp: new Date().toISOString(),
    event,
    details,
  };
  window.dispatchEvent(new CustomEvent('app-log', { detail: log }));
};
