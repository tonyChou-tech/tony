import { useState } from 'react'
import AdBanner from '../../components/AdBanner'

function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [status, setStatus] = useState('')

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setStatus('格式化成功')
    } catch (error) {
      setStatus('錯誤：' + error.message)
      setOutput('')
    }
  }

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setStatus('壓縮成功')
    } catch (error) {
      setStatus('錯誤：' + error.message)
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

  return (
    <div className="tool-page">
      <h1>JSON 格式化工具</h1>
      <p>格式化、壓縮和驗證 JSON 數據</p>

      <AdBanner />

      <div className="tool-card">
        <div>
          <h3>輸入 JSON</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='輸入 JSON 數據，例如：{"name":"John","age":30}'
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '1rem',
              fontFamily: 'monospace',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button onClick={handleFormat}>格式化</button>
          <button onClick={handleMinify}>壓縮</button>
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
                minHeight: '200px',
                padding: '1rem',
                fontFamily: 'monospace',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: '#f5f5f5',
                resize: 'vertical'
              }}
            />
          </div>
        )}

        <div className="info-box" style={{ marginTop: '2rem' }}>
          <h3>功能說明</h3>
          <ul>
            <li><strong>格式化</strong>：美化 JSON，添加縮排和換行</li>
            <li><strong>壓縮</strong>：移除所有空白字符，最小化 JSON 大小</li>
            <li><strong>驗證</strong>：自動檢測 JSON 語法錯誤</li>
            <li>所有處理都在本地完成，數據不會上傳</li>
          </ul>
        </div>
      </div>

      <AdBanner />
    </div>
  )
}

export default JsonFormatter
