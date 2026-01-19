# Google AdSense 整合說明

## 📋 設定步驟

### 1. 申請 Google AdSense 帳號

1. 前往 [Google AdSense](https://www.google.com/adsense/)
2. 使用 Google 帳號登入並申請
3. 填寫網站資訊和付款資訊
4. 等待審核通過（通常需要幾天）

### 2. 取得 AdSense 代碼

審核通過後：

1. 登入 AdSense 控制台
2. 點選「廣告」→「總覽」
3. 複製您的 AdSense 發布商 ID（格式：`ca-pub-XXXXXXXXXX`）

### 3. 更新專案中的 AdSense ID

需要修改以下兩個檔案：

#### 檔案 1: `index.html`

```html
<!-- 將 XXXXXXXXXX 替換為您的實際 ID -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
 crossorigin="anonymous"></script>
```

#### 檔案 2: `src/components/AdBanner.jsx`

```javascript
<ins
  className="adsbygoogle"
  style={{ display: 'block' }}
  data-ad-client="ca-pub-XXXXXXXXXX"  // 替換這裡
  data-ad-slot={slot}
  data-ad-format={format}
  data-full-width-responsive={responsive}
></ins>
```

### 4. 設定廣告單元

1. 在 AdSense 控制台中建立廣告單元
2. 選擇「多媒體廣告」
3. 複製廣告槽 ID（data-ad-slot）
4. 在使用 `<AdBanner>` 組件時傳入 slot ID：

```jsx
<AdBanner slot="1234567890" />
```

## 📍 廣告位置

目前專案中已設置的廣告位置：

1. **首頁**
   - 頁面頂部橫幅廣告
   - 中間穿插廣告（2處）

2. **所有工具頁面**
   - 工具說明下方
   - 頁面底部

## 🎯 廣告最佳實踐

### 1. 廣告數量
- 每頁建議 2-3 個廣告單元
- 避免廣告過多影響用戶體驗
- 確保內容比廣告更突出

### 2. 廣告尺寸
推薦使用響應式廣告：
- 自動調整大小適應不同設備
- 使用 `data-full-width-responsive="true"`

常見尺寸：
- 橫幅廣告：728x90（桌面）、320x50（手機）
- 矩形廣告：300x250
- 大矩形：336x280
- 頁首橫幅：970x90

### 3. 廣告位置
最佳位置：
- 文章內容中間
- 側邊欄
- 頁面頂部（但不要遮擋主要內容）
- 評論區上方

避免：
- 遮擋導航選單
- 太接近可點擊元素
- 放在頁面最底部（效果較差）

### 4. 廣告格式
```jsx
// 自動廣告（推薦）
<AdBanner slot="auto" format="auto" responsive="true" />

// 固定尺寸廣告
<AdBanner slot="1234567890" format="rectangle" />
```

## 🚀 部署注意事項

### 1. 網域驗證
- 部署後，需要在 AdSense 控制台添加您的網域
- GitHub Pages 網址格式：`https://[username].github.io/[repo-name]/`

### 2. ads.txt 文件
建議在 `public` 資料夾中創建 `ads.txt` 檔案：

```
google.com, pub-XXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

### 3. 隱私政策
根據 AdSense 政策，您的網站需要有隱私政策頁面，說明：
- 使用 Cookie
- Google AdSense 收集的資料
- 用戶權利

## 📊 收益優化建議

1. **內容優化**
   - 提供有價值的工具和內容
   - 保持頁面載入速度快
   - 優化 SEO

2. **用戶體驗**
   - 廣告不應干擾工具使用
   - 保持頁面乾淨整潔
   - 響應式設計

3. **A/B 測試**
   - 測試不同廣告位置
   - 嘗試不同廣告格式
   - 監控點擊率和收益

## 🔍 監控和分析

使用 AdSense 報表監控：
- 頁面瀏覽量
- 點擊率 (CTR)
- 每千次曝光收益 (RPM)
- 收益趨勢

## ⚠️ 重要規則

### 禁止事項：
- ❌ 不要點擊自己的廣告
- ❌ 不要要求用戶點擊廣告
- ❌ 不要在廣告旁加誤導性文字
- ❌ 不要修改廣告代碼

### 違規後果：
- 帳號被暫停
- 收益被扣除
- 永久封禁

## 📝 測試模式

在開發環境中，`AdBanner` 組件會顯示佔位符而不是實際廣告。

要測試實際廣告：
```bash
npm run build
npm run preview
```

然後訪問預覽網址（通常是 http://localhost:4173）

## 🆘 常見問題

### Q: 為什麼看不到廣告？
A:
- 確認 AdSense ID 正確
- 檢查帳號是否審核通過
- 使用開發者工具查看錯誤訊息
- 確認沒有使用廣告攔截器

### Q: 收益很低怎麼辦？
A:
- 增加網站流量
- 優化廣告位置
- 提供更有價值的內容
- 改善 SEO

### Q: 多久能收到款項？
A:
- 當收益達到 $100 美元時會付款
- 通常在每月 21-26 日付款

## 📚 相關資源

- [AdSense 說明中心](https://support.google.com/adsense)
- [AdSense 政策](https://support.google.com/adsense/answer/48182)
- [AdSense 最佳化建議](https://support.google.com/adsense/answer/17957)
