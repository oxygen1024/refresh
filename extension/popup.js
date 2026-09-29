const $ = (s) => document.querySelector(s);
const MIN_MS = 100;
let tab;

const key = () => `tab_${tab.id}`;

function highlight(sec) {
  document.querySelectorAll('.presets button').forEach((b) => {
    b.classList.toggle('sel', Number(b.dataset.s) === Number(sec));
  });
}

async function send(msg) {
  try {
    await chrome.tabs.sendMessage(tab.id, msg);
  } catch {
    // Content script missing (tab opened before the extension was installed): inject it.
    await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['content.js'] });
    await chrome.tabs.sendMessage(tab.id, msg);
  }
}

async function showStatus() {
  const ms = (await chrome.storage.session.get(key()))[key()] || 0;
  $('#status').textContent = ms ? `▶ 運行中：每 ${ms / 1000} 秒重新整理` : '■ 已停止';
  if (ms) { $('#sec').value = ms / 1000; highlight(ms / 1000); }
}

async function start() {
  const ms = Math.max(MIN_MS, Math.round(Number($('#sec').value) * 1000));
  await chrome.storage.session.set({ [key()]: ms });
  try {
    await send({ type: 'start', ms });
  } catch (e) {
    await chrome.storage.session.remove(key());
    $('#status').textContent = '呢個頁面唔可以自動重新整理（例如 chrome:// 頁面）';
    return;
  }
  const text = ms < 1000 ? `${ms / 1000}`.replace(/^0/, '') : `${ms / 1000}s`;
  await chrome.action.setBadgeText({ tabId: tab.id, text });
  await chrome.action.setBadgeBackgroundColor({ tabId: tab.id, color: '#16a34a' });
  showStatus();
}

async function stop() {
  await chrome.storage.session.remove(key());
  await send({ type: 'stop' }).catch(() => {});
  await chrome.action.setBadgeText({ tabId: tab.id, text: '' });
  showStatus();
}

document.querySelectorAll('.presets button').forEach((b) => {
  b.addEventListener('click', () => { $('#sec').value = b.dataset.s; highlight(b.dataset.s); start(); });
});
$('#sec').addEventListener('input', () => highlight($('#sec').value));
$('#start').addEventListener('click', start);
$('#stop').addEventListener('click', stop);

chrome.tabs.query({ active: true, currentWindow: true }).then(([t]) => { tab = t; showStatus(); });
