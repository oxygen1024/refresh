// Runs in every page. Asks the background whether this tab should auto-refresh,
// then schedules a reload. The popup can start/stop it live via messages.
if (!window.__autoRefreshLoaded) {
  window.__autoRefreshLoaded = true;
  let timer = null;

  const start = (ms) => {
    clearTimeout(timer);
    if (ms > 0) timer = setTimeout(() => location.reload(), ms);
  };

  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg.type === 'start') start(msg.ms);
    if (msg.type === 'stop') clearTimeout(timer);
    sendResponse({ ok: true });
  });

  chrome.runtime.sendMessage({ type: 'whoami' }, (res) => {
    if (chrome.runtime.lastError) return;
    if (res && res.ms) start(res.ms);
  });
}
