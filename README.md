# Auto Refresh 自動重新整理

A small Chrome / Edge extension that reloads the current tab automatically, for example every 3 seconds or as fast as every 0.1 seconds.

一個 Chrome / Edge 擴充功能，可以令目前個分頁自動重新整理，例如每 3 秒一次，最快可以每 0.1 秒一次。

## 安裝 Install

1. Download this repo (Code → Download ZIP) and unzip it. 下載呢個 repo 再解壓。
2. Open `chrome://extensions` (Edge: `edge://extensions`). 開 `chrome://extensions`。
3. Turn on **Developer mode**. 開啟右上角「開發人員模式」。
4. Click **Load unpacked** and choose the `extension` folder. 撳「載入未封裝項目」，揀 `extension` 資料夾。

## 使用 Use

1. Open the page you want to refresh. 打開想自動重新整理嘅網頁。
2. Click the extension icon. 撳工具列上嘅擴充功能圖示。
3. Pick a preset (0.1s / 0.5s / 1s / 3s / 5s / 10s) or type your own number of seconds, then press **Start 開始**. 揀預設秒數或者自己輸入，再撳「開始」。
4. Press **Stop 停止** to stop. 撳「停止」就會停。

- Each tab has its own setting. 每個分頁可以設定唔同秒數。
- The icon badge shows the current interval. 圖示上會顯示而家嘅秒數。
- Settings reset when you close the tab or the browser. 關閉分頁或瀏覽器後會自動停止。
- Browser pages such as `chrome://` can't be refreshed. `chrome://` 呢類頁面唔支援。

⚠️ Very fast refreshing (under 1 second) can use a lot of CPU and network, and some websites may block you. 太快（少過 1 秒）會用好多 CPU 同網絡，有啲網站可能會封鎖你。
