// Per-tab refresh intervals (ms) live in session storage so they survive
// service-worker restarts but are cleared when the browser closes.
const key = (tabId) => `tab_${tabId}`;

async function getInterval(tabId) {
  const data = await chrome.storage.session.get(key(tabId));
  return data[key(tabId)] || 0;
}

async function setBadge(tabId, ms) {
  const text = ms ? (ms < 1000 ? `${ms / 1000}`.replace(/^0/, '') : `${ms / 1000}s`) : '';
  await chrome.action.setBadgeText({ tabId, text }).catch(() => {});
  await chrome.action.setBadgeBackgroundColor({ tabId, color: '#16a34a' }).catch(() => {});
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'whoami' && sender.tab) {
    getInterval(sender.tab.id).then((ms) => {
      setBadge(sender.tab.id, ms);
      sendResponse({ ms });
    });
    return true;
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.session.remove(key(tabId));
});
