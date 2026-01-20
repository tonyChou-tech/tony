# 環境變數設定指南

## 為什麼使用 `import.meta.env` 而不是 `process.env`？

- **Vite 專案**使用 `import.meta.env` 來存取環境變數
- **Node.js** 使用 `process.env`（僅後端可用）
- **Create React App** 使用 `process.env.REACT_APP_*`

在 Vite 中，所有以 `VITE_` 開頭的環境變數會在建置時被替換成實際值。

## 本地開發環境

1. 複製 `.env.example` 並重新命名為 `.env`
2. 填入你的 AdSense Client ID：
   ```
   VITE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
   ```

## GitHub 環境變數設定步驟

### 方法一：使用 GitHub Web Interface

1. 進入你的 GitHub repository
2. 點擊 `Settings` (設定)
3. 在左側選單中找到 `Secrets and variables` > `Actions`
4. 點擊 `New repository secret` 按鈕
5. 填寫：
   - **Name**: `VITE_ADSENSE_CLIENT_ID`
   - **Value**: `ca-pub-8356436630244164` (或你的 AdSense ID)
6. 點擊 `Add secret` 儲存

### 方法二：使用 GitHub CLI (gh)

```bash
gh secret set VITE_ADSENSE_CLIENT_ID --body "ca-pub-8356436630244164"
```

## 驗證設定

設定完成後，下次 push 到 main branch 時，GitHub Actions 會自動使用這個環境變數來建置專案。

你可以在 Actions 執行記錄中看到建置過程，但不會看到環境變數的實際值（已加密）。
