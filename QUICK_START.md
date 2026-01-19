# 🚀 快速開始

## 立即部署（5 分鐘）

### 1️⃣ 安裝依賴
```bash
npm install
```

### 2️⃣ 本地測試
```bash
npm run dev
```
訪問 http://localhost:5173

### 3️⃣ 推送到 GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 4️⃣ 啟用 GitHub Pages
1. 前往 GitHub 倉庫 → **Settings** → **Pages**
2. Source 選擇 **GitHub Actions**
3. 完成！等待自動部署

訪問 `https://YOUR_USERNAME.github.io/tony-1/`

## 🎯 整合 Google AdSense（可選）

### 1. 申請 AdSense
前往 https://www.google.com/adsense/ 申請帳號

### 2. 取得 Publisher ID
格式：`ca-pub-XXXXXXXXXX`

### 3. 替換 ID（2個位置）

**index.html** (第 10 行)：
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
```

**src/components/AdBanner.jsx** (第 34 行)：
```javascript
data-ad-client="ca-pub-XXXXXXXXXX"
```

### 4. 重新部署
```bash
git add .
git commit -m "Add AdSense"
git push origin main
```

詳細說明請查看 [ADSENSE_SETUP.md](./ADSENSE_SETUP.md)

## 📝 自定義配置

### 修改倉庫名稱
如果你的倉庫不叫 `tony-1`，修改這 2 個檔案：

**vite.config.js**:
```javascript
base: '/YOUR_REPO_NAME/',
```

**src/main.jsx**:
```javascript
<BrowserRouter basename="/YOUR_REPO_NAME">
```

### 修改網站標題
**index.html** (第 8 行):
```html
<title>你的網站名稱</title>
```

## 🔧 可用指令

```bash
npm run dev      # 開發模式
npm run build    # 建置生產版本
npm run preview  # 預覽建置結果
npm run deploy   # 手動部署到 GitHub Pages
```

## 📚 更多資訊

- [完整 README](./README.md)
- [部署指南](./DEPLOYMENT.md)
- [AdSense 設定](./ADSENSE_SETUP.md)

## ❓ 遇到問題？

### 建置失敗
```bash
# 清除並重新安裝
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 頁面 404
確認 `vite.config.js` 和 `src/main.jsx` 中的路徑與倉庫名稱一致

### 廣告不顯示
開發環境會顯示佔位符，建置後才會顯示真實廣告：
```bash
npm run build
npm run preview
```

## 🎉 完成！

你的線上工具網站已經準備好了！

分享給朋友：`https://YOUR_USERNAME.github.io/tony-1/`
