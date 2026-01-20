import { useState, useEffect, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import AdBanner from '../../components/AdBanner'

interface CurrencyRates {
  [key: string]: number
}

interface CurrencyData {
  amount: number
  base: string
  date: string
  rates: CurrencyRates
}

// 貨幣資訊
const currencyInfo: { [key: string]: { name: string; flag: string } } = {
  TWD: { name: '新台幣', flag: '🇹🇼' },
  USD: { name: '美元', flag: '🇺🇸' },
  EUR: { name: '歐元', flag: '🇪🇺' },
  JPY: { name: '日圓', flag: '🇯🇵' },
  GBP: { name: '英鎊', flag: '🇬🇧' },
  CNY: { name: '人民幣', flag: '🇨🇳' },
  HKD: { name: '港幣', flag: '🇭🇰' },
  KRW: { name: '韓元', flag: '🇰🇷' },
  SGD: { name: '新加坡元', flag: '🇸🇬' },
  AUD: { name: '澳幣', flag: '🇦🇺' },
  CAD: { name: '加拿大元', flag: '🇨🇦' },
  CHF: { name: '瑞士法郎', flag: '🇨🇭' },
  THB: { name: '泰銖', flag: '🇹🇭' },
  MYR: { name: '馬來西亞令吉', flag: '🇲🇾' },
  PHP: { name: '菲律賓披索', flag: '🇵🇭' },
  IDR: { name: '印尼盾', flag: '🇮🇩' },
  INR: { name: '印度盧比', flag: '🇮🇳' },
  NZD: { name: '紐西蘭元', flag: '🇳🇿' },
  SEK: { name: '瑞典克朗', flag: '🇸🇪' },
  NOK: { name: '挪威克朗', flag: '🇳🇴' },
  DKK: { name: '丹麥克朗', flag: '🇩🇰' },
  PLN: { name: '波蘭茲羅提', flag: '🇵🇱' },
  CZK: { name: '捷克克朗', flag: '🇨🇿' },
  HUF: { name: '匈牙利福林', flag: '🇭🇺' },
  RON: { name: '羅馬尼亞列伊', flag: '🇷🇴' },
  TRY: { name: '土耳其里拉', flag: '🇹🇷' },
  ZAR: { name: '南非蘭特', flag: '🇿🇦' },
  BRL: { name: '巴西雷亞爾', flag: '🇧🇷' },
  MXN: { name: '墨西哥披索', flag: '🇲🇽' },
  ILS: { name: '以色列新謝克爾', flag: '🇮🇱' },
  ISK: { name: '冰島克朗', flag: '🇮🇸' },
}

function CurrencyConverter() {
  const { t } = useTranslation()
  const [amount, setAmount] = useState<string>('100')
  const [fromCurrency, setFromCurrency] = useState<string>('USD')
  const [toCurrency, setToCurrency] = useState<string>('TWD')
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [lastUpdate, setLastUpdate] = useState<string>('')
  const [allRates, setAllRates] = useState<CurrencyRates>({})

  // 載入所有匯率
  useEffect(() => {
    fetchAllRates()
  }, [])

  const fetchAllRates = async () => {
    try {
      const response = await fetch('https://api.frankfurter.app/latest')
      const data: CurrencyData = await response.json()
      setAllRates({ EUR: 1, ...data.rates })
      setLastUpdate(data.date)
    } catch (err) {
      console.error('Failed to fetch rates:', err)
    }
  }

  const handleConvert = async () => {
    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('請輸入有效的金額')
      return
    }

    if (fromCurrency === toCurrency) {
      setResult(amountNum)
      setError('')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amountNum}&from=${fromCurrency}&to=${toCurrency}`
      )

      if (!response.ok) {
        throw new Error('無法取得匯率資料')
      }

      const data: CurrencyData = await response.json()
      setResult(data.rates[toCurrency])
      setLastUpdate(data.date)
    } catch (err) {
      setError(err instanceof Error ? err.message : '轉換失敗')
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
    setResult(null)
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setResult(null)
  }

  // 計算常見金額的快速參考
  const getQuickReference = () => {
    if (!allRates[fromCurrency] || !allRates[toCurrency]) return []

    const rate = allRates[toCurrency] / allRates[fromCurrency]
    return [1, 10, 100, 1000, 10000].map(amt => ({
      amount: amt,
      converted: (amt * rate).toFixed(2)
    }))
  }

  return (
    <div className="tool-page">
      <h1>💱 {t('otherTools.currencyConverter.title')}</h1>
      <p>{t('otherTools.currencyConverter.description')}</p>

      <AdBanner />

      <div className="tool-card">
        {/* 金額輸入 */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="amount" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            金額
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            placeholder="輸入金額"
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1.25rem',
              borderRadius: '8px',
              border: '2px solid #e2e8f0',
            }}
          />
        </div>

        {/* 貨幣選擇 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* 來源貨幣 */}
          <div>
            <label htmlFor="from" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              從
            </label>
            <select
              id="from"
              value={fromCurrency}
              onChange={(e) => { setFromCurrency(e.target.value); setResult(null); }}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                borderRadius: '8px',
                border: '2px solid #e2e8f0',
              }}
            >
              {Object.entries(currencyInfo).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.flag} {code} - {info.name}
                </option>
              ))}
            </select>
          </div>

          {/* 交換按鈕 */}
          <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '0.5rem' }}>
            <button
              onClick={swapCurrencies}
              style={{
                padding: '0.75rem',
                fontSize: '1.25rem',
                borderRadius: '8px',
                border: '2px solid #e2e8f0',
                background: 'white',
                cursor: 'pointer',
              }}
              title="交換貨幣"
            >
              🔄
            </button>
          </div>

          {/* 目標貨幣 */}
          <div>
            <label htmlFor="to" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              到
            </label>
            <select
              id="to"
              value={toCurrency}
              onChange={(e) => { setToCurrency(e.target.value); setResult(null); }}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                borderRadius: '8px',
                border: '2px solid #e2e8f0',
              }}
            >
              {Object.entries(currencyInfo).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.flag} {code} - {info.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 轉換按鈕 */}
        <button
          onClick={handleConvert}
          disabled={loading}
          style={{ width: '100%', marginBottom: '1.5rem' }}
        >
          {loading ? '轉換中...' : '💱 轉換'}
        </button>

        {/* 結果顯示 */}
        {result !== null && (
          <div style={{
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            color: 'white',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', opacity: 0.9 }}>
              {amount} {fromCurrency} =
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {result.toLocaleString('zh-TW', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}
            </div>
            {lastUpdate && (
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                更新時間: {lastUpdate}
              </div>
            )}
          </div>
        )}

        {/* 錯誤訊息 */}
        {error && (
          <div className="status-message" style={{ background: '#fee', color: '#c00', marginBottom: '1.5rem' }}>
            <p>{error}</p>
          </div>
        )}

        {/* 快速參考表 */}
        {result !== null && getQuickReference().length > 0 && (
          <div className="info-box" style={{ marginTop: '1.5rem' }}>
            <h3>快速參考</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>{fromCurrency}</th>
                  <th style={{ padding: '0.5rem', textAlign: 'right' }}>{toCurrency}</th>
                </tr>
              </thead>
              <tbody>
                {getQuickReference().map((ref, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.5rem' }}>{ref.amount.toLocaleString()}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'right', fontWeight: 'bold' }}>
                      {parseFloat(ref.converted).toLocaleString('zh-TW', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 說明 */}
        <div className="info-box" style={{ marginTop: '1.5rem' }}>
          <h3>功能說明</h3>
          <ul>
            <li>支援 31 種主要貨幣轉換</li>
            <li>即時匯率數據（基於歐洲央行）</li>
            <li>每日更新匯率</li>
            <li>提供快速參考表</li>
            <li>數據來源：Frankfurter API</li>
          </ul>
        </div>
      </div>

      <AdBanner />
    </div>
  )
}

export default CurrencyConverter
