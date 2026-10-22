# 烘焙體驗護照｜HTML 簡報

目前已完成 **P1 封面、P2 顧客旅程圖、P3 Demo 展示與 P4 品牌體驗延伸**。

## 預覽

直接用 Chrome 或 Edge 開啟 `index.html` 即可。簡報素材都走本機相對路徑，無需網路。

也可在本資料夾執行：

```powershell
python -m http.server 8000
```

然後開啟 `http://localhost:8000/`。

## 操作

- `←` / `→`：上一頁／下一頁
- `F`：進入／離開全螢幕
- `P`：列印或輸出 PDF
- P3 影片：用畫面兩側箭頭或右側編號選單切換兩支影片；中間說明會同步切換。使用播放器控制播放、暫停，或按右下「全螢幕播放」。切換影片或投影片時，原影片會暫停
- 畫面左下角也有對應按鈕；滑鼠移上去會顯示清楚

輸出 PDF 時，在瀏覽器列印設定選「另存為 PDF」，並開啟「背景圖形」。列印樣式已設為 16:9 無邊界。

## 素材與製作

- 原始素材位於上一層的 `PPT_Assets`。
- `assets/cover-phones-v2.png` 是提供的新版雙手機照片去除白底後的透明圖，保留兩支手機的透視與遮擋，供 P1 封面使用。
- `assets/demo.mp4` 與 `assets/Flashcard_Demo.mp4` 是提供的兩支原始操作影片複本，簡報可離線播放。
- `assets/demo-poster.png` 與 `assets/flashcard-poster.png` 是直接從上述原始影片擷取的預覽畫面，沒有重繪 Demo 介面。
- `assets/photobooth-result.jpg` 與 `assets/interaction_qr_code.jpg` 是提供的拍貼成果與 QR Code 原檔複本，供 P4 離線顯示。掃描 QR Code 開啟線上 Demo 時需網路連線。
- 中文與內文字型使用本機打包的 Noto Sans TC；P1 英文大標使用本機打包的 Barlow Condensed Black（授權條款見 `assets/BarlowCondensed-OFL.txt`），避免投影現場依賴線上字型。
