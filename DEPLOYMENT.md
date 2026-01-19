# 部署指南

## 🚀 快速部署到 GitHub Pages

### 步驟 1: 準備 GitHub 倉庫

如果還沒有推送到 GitHub：

```bash
# 初始化 git（如果還沒有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 線上工具集"

# 添加遠端倉庫
git remote add origin https://github.com/YOUR_USERNAME/tony-1.git

# 推送到 GitHub
git push -u origin main
```

### 步驟 2: 啟用 GitHub Pages

1. 前往你的 GitHub 倉庫頁面
2. 點擊 **Settings** （設定）
3. 在左側選單找到 **Pages**
4. 在 **Build and deployment** 區域：
   - **Source**: 選擇 **GitHub Actions**
5. 保存設定

### 步驟 3: 自動部署

推送代碼後，GitHub Actions 會自動開始建置和部署：

```bash
git push origin main
```

查看部署狀態：
- 前往倉庫的 **Actions** 標籤
- 查看 "Deploy to GitHub Pages" 工作流程

部署成功後，訪問：
```
https://YOUR_USERNAME.github.io/tony-1/
```

## 🔧 配置說明

### 修改倉庫名稱

如果你的倉庫名稱不是 `tony-1`，需要修改：

#### 1. vite.config.js
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/YOUR_REPO_NAME/',  // 改這裡
})
```

#### 2. src/main.jsx
```javascript
<BrowserRouter basename="/YOUR_REPO_NAME">  // 改這裡
  <App />
</BrowserRouter>
```

#### 3. package.json
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### 使用自定義網域

1. 在倉庫根目錄創建 `public/CNAME` 文件
2. 內容為你的網域名稱：
   ```
   example.com
   ```
3. 在 `vite.config.js` 中設定：
   ```javascript
   base: '/',  // 使用自定義網域時設為 '/'
   ```
4. 在 DNS 設定中添加 CNAME 記錄指向 `YOUR_USERNAME.github.io`

## 🛠️ 手動部署（使用 gh-pages）

如果不想使用 GitHub Actions：

```bash
# 一鍵部署
npm run deploy
```

這會自動建置並推送到 `gh-pages` 分支。

## ✅ 部署檢查清單

在部署前確認：

- [ ] 已更新 `vite.config.js` 中的 `base` 路徑
- [ ] 已更新 `src/main.jsx` 中的 `basename`
- [ ] 已測試本地建置：`npm run build && npm run preview`
- [ ] 已替換 Google AdSense ID（如果使用）
- [ ] 已創建 `public/ads.txt`（如果使用 AdSense）
- [ ] 已添加隱私政策頁面（如果使用 AdSense）

## 🐛 常見問題

### 問題 1: 頁面顯示 404

**原因**: 基礎路徑配置錯誤

**解決方法**:
- 確認 `vite.config.js` 的 `base` 與倉庫名稱一致
- 確認 `src/main.jsx` 的 `basename` 與倉庫名稱一致

### 問題 2: GitHub Actions 失敗

**檢查**:
- 查看 Actions 日誌中的錯誤訊息
- 確認 `package.json` 中的依賴正確
- 確認 GitHub Pages 已啟用

### 問題 3: 資源載入失敗

**原因**: 相對路徑問題

**解決方法**:
- 確保所有資源使用相對路徑
- 檢查 `index.html` 中的資源路徑
- 使用 `import` 而不是直接路徑引用資源

### 問題 4: 廣告不顯示

**檢查**:
- AdSense ID 是否正確
- 網站是否通過 AdSense 審核
- 是否在正式環境（開發環境會顯示佔位符）
- 瀏覽器是否有廣告攔截器

## 📊 部署後優化

### 1. 效能優化
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'pdf-vendor': ['pdf-lib', 'pdfjs-dist'],
          'image-vendor': ['browser-image-compression', 'html2canvas'],
        },
      },
    },
  },
})
```

### 2. SEO 優化
在 `index.html` 添加：
```html
<meta name="description" content="免費線上工具集 - PDF 轉檔、圖片處理、文件工具">
<meta name="keywords" content="PDF,圖片壓縮,格式轉換,線上工具">
<meta property="og:title" content="線上工具集">
<meta property="og:description" content="免費的 PDF、圖片、文件處理工具">
```

### 3. Analytics
添加 Google Analytics：
```html
<!-- index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🔄 更新部署

每次有新的變更：

```bash
git add .
git commit -m "描述你的變更"
git push origin main
```

GitHub Actions 會自動重新部署。

## 📞 需要幫助？

- 查看 [GitHub Pages 文件](https://docs.github.com/pages)
- 查看 [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- 開 Issue 詢問問題
