import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import QRCode from "qrcode";

function QrCodeGenerator() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [status, setStatus] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleGenerate = async () => {
    if (!text) {
      setStatus(t("errors.fileRequired"));
      return;
    }

    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      await QRCode.toCanvas(canvas, text, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF"
        }
      });

      const url = canvas.toDataURL();
      setQrCodeUrl(url);
      setStatus(t("otherTools.qrCode.success"));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : t("errors.unknownError");
      setStatus(t("errors.processingFailed", { message: errorMessage }));
      console.error(error);
    }
  };

  const handleDownload = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "qrcode.png";
    link.click();
    setStatus(t("common.success"));
  };

  const handleClear = () => {
    setText("");
    setQrCodeUrl("");
    setStatus("");
  };

  const examples = [
    { label: "網址", value: "https://example.com" },
    { label: "電話", value: "tel:+886912345678" },
    { label: "Email", value: "mailto:example@email.com" },
    { label: "WiFi", value: "WIFI:T:WPA;S:NetworkName;P:Password;;" }
  ];

  return (
    <div className="tool-page">
      <h1>{t("otherTools.qrCode.title")}</h1>
      <p>{t("otherTools.qrCode.description")}</p>

      <div className="tool-card">
        <div>
          <h3>{t("otherTools.qrCode.inputContent")}</h3>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("otherTools.qrCode.placeholder")}
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "1rem",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              resize: "vertical"
            }}
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <h4>{t("otherTools.qrCode.quickExamples")}</h4>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {examples.map((example) => (
              <button
                key={example.label}
                onClick={() => setText(example.value)}
                style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button onClick={handleGenerate}>
            {t("otherTools.qrCode.generate")}
          </button>
          <button onClick={handleClear}>{t("common.clear")}</button>
        </div>

        {status && (
          <div className="status-message">
            <p>{status}</p>
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {qrCodeUrl && (
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <h3>{t("otherTools.qrCode.generated")}</h3>
            <div
              style={{
                display: "inline-block",
                padding: "1rem",
                background: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >
              <img src={qrCodeUrl} alt="QR Code" style={{ display: "block" }} />
            </div>
            <button onClick={handleDownload} style={{ marginTop: "1rem" }}>
              {t("otherTools.qrCode.downloadQR")}
            </button>
          </div>
        )}

        <div className="info-box" style={{ marginTop: "2rem" }}>
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
    </div>
  );
}

export default QrCodeGenerator;
