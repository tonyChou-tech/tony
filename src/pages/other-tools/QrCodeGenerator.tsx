import { useState, useRef, useEffect } from 'react'
import QRCode from 'qrcode'
import AdBanner from '../../components/AdBanner'

function QrCodeGenerator() {
  const [text, setText] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [status, setStatus] = useState('')
  const canvasRef = useRef(null)

  const handleGenerate = async () => {
    if (!text) {
      setStatus('請輸入內容')
      return
    }

    try {
      const canvas = canvasRef.current
      await QRCode.toCanvas(canvas, text, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })

      const url = canvas.toDataURL()
      setQrCodeUrl(url)
      setStatus('QR Code 已生成')
    } catch (error) {
      setStatus('生成失敗：' + error.message)
      console.error(error)
    }
  }

  const handleDownload = () => {
    if (!qrCodeUrl) return

    const link = document.createElement('a')
    link.href = qrCodeUrl
    link.download = 'qrcode.png'
    link.click()
    setStatus('QR Code 已下載')
  }

  const handleClear = () => {
    setText('')
    setQrCodeUrl('')
    setStatus('')
  }

  const examples = [
    { label: '網址', value: 'https://example.com' },
    { label: '電話', value: 'tel:+886912345678' },
    { label: 'Email', value: 'mailto:example@email.com' },
    { label: 'WiFi', value: 'WIFI:T:WPA;S:NetworkName;P:Password;;' },
  ]

  return (
    <div className="tool-page">
      <h1>QR Code 生成器</h1>
      <p>生成 QR Code 二維碼</p>

      <AdBanner />

      <div className="tool-card">
        <div>
          <h3>輸入內容</h3>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="輸入要生成 QR Code 的內容（網址、文字、電話等）"
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '1rem',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <h4>快速範例</h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {examples.map((example) => (
              <button
                key={example.label}
                onClick={() => setText(example.value)}
                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button onClick={handleGenerate}>生成 QR Code</button>
          <button onClick={handleClear}>清除</button>
        </div>

        {status && (
          <div className="status-message">
            <p>{status}</p>
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {qrCodeUrl && (
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <h3>生成的 QR Code</h3>
            <div style={{
              display: 'inline-block',
              padding: '1rem',
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <img src={qrCodeUrl} alt="QR Code" style={{ display: 'block' }} />
            </div>
            <button onClick={handleDownload} style={{ marginTop: '1rem' }}>
              下載 QR Code
            </button>
          </div>
        )}

        <div className="info-box" style={{ marginTop: '2rem' }}>
          <h3>使用說明</h3>
          <ul>
            <li>支援任何文字內容</li>
            <li>網址會自動被識別並可點擊</li>
            <li>電話號碼格式：tel:+886912345678</li>
            <li>Email 格式：mailto:example@email.com</li>
            <li>WiFi 格式：WIFI:T:WPA;S:網路名稱;P:密碼;;</li>
            <li>生成的 QR Code 為 PNG 格式，可直接下載使用</li>
          </ul>
        </div>
      </div>

      <AdBanner />
    </div>
  )
}

export default QrCodeGenerator
