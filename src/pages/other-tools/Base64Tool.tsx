import { useState, ChangeEvent } from 'react'
import AdBanner from '../../components/AdBanner'

function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [status, setStatus] = useState('')
  const [mode, setMode] = useState('encode') // 'encode' or 'decode'

  const handleEncode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)))
      setOutput(encoded)
      setStatus('編碼成功')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setStatus('編碼失敗：' + errorMessage)
      setOutput('')
    }
  }

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)))
      setOutput(decoded)
      setStatus('解碼成功')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setStatus('解碼失敗：' + errorMessage)
      setOutput('')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setStatus('已複製到剪貼簿')
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setStatus('')
  }

  const handleFileEncode = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target?.result
      if (typeof base64 === 'string') {
        setOutput(base64)
        setStatus(`文件已編碼 (${file.name})`)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="tool-page">
      <h1>Base64 編碼/解碼工具</h1>
      <p>Base64 編碼和解碼文字與文件</p>

      <AdBanner />

      <div className="tool-card">
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ marginRight: '1rem' }}>
            <input
              type="radio"
              value="encode"
              checked={mode === 'encode'}
              onChange={(e) => setMode(e.target.value)}
            />
            {' '}編碼
          </label>
          <label>
            <input
              type="radio"
              value="decode"
              checked={mode === 'decode'}
              onChange={(e) => setMode(e.target.value)}
            />
            {' '}解碼
          </label>
        </div>

        <div>
          <h3>輸入</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? '輸入要編碼的文字' : '輸入要解碼的 Base64 字串'}
            style={{
              width: '100%',
              minHeight: '150px',
              padding: '1rem',
              fontFamily: 'monospace',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          {mode === 'encode' && (
            <>
              <button onClick={handleEncode}>編碼文字</button>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="file-encode"
                  onChange={handleFileEncode}
                  style={{ display: 'none' }}
                />
                <label htmlFor="file-encode" className="file-input-label">
                  編碼文件
                </label>
              </div>
            </>
          )}
          {mode === 'decode' && (
            <button onClick={handleDecode}>解碼</button>
          )}
          <button onClick={handleClear}>清除</button>
        </div>

        {status && (
          <div className="status-message">
            <p>{status}</p>
          </div>
        )}

        {output && (
          <div style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>輸出</h3>
              <button onClick={handleCopy}>複製</button>
            </div>
            <textarea
              value={output}
              readOnly
              style={{
                width: '100%',
                minHeight: '150px',
                padding: '1rem',
                fontFamily: 'monospace',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: '#f5f5f5',
                resize: 'vertical',
                wordBreak: 'break-all'
              }}
            />
          </div>
        )}

        <div className="info-box" style={{ marginTop: '2rem' }}>
          <h3>關於 Base64</h3>
          <ul>
            <li>Base64 是一種編碼方式，將二進制數據轉換為 ASCII 字符</li>
            <li>常用於在文本協議中傳輸二進制數據</li>
            <li>支援中文和其他 UTF-8 字符</li>
            <li>可以編碼文件（如圖片）為 Data URL</li>
            <li>所有處理都在本地完成</li>
          </ul>
        </div>
      </div>

      <AdBanner />
    </div>
  )
}

export default Base64Tool
