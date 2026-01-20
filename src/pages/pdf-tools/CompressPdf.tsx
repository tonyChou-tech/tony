import { useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { PDFDocument } from "pdf-lib";

function CompressPdf() {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
      setStatus("");
      setCompressedSize(0);
    } else {
      setStatus(t("errors.invalidFile"));
    }
  };

  const handleCompress = async () => {
    if (!file) {
      setStatus(t("errors.fileRequired"));
      return;
    }

    setLoading(true);
    setStatus(t("pdfTools.compressPdf.compressing"));

    try {
      const fileData = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileData);

      // 注意：pdf-lib 的壓縮功能有限
      // 主要是移除未使用的對象和優化結構
      const compressedPdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false
      });

      const compressedBlob = new Blob([compressedPdfBytes as BlobPart], {
        type: "application/pdf"
      });
      const url = URL.createObjectURL(compressedBlob);

      setCompressedSize(compressedBlob.size);

      const link = document.createElement("a");
      link.href = url;
      link.download = file.name.replace(".pdf", "-compressed.pdf");
      link.click();

      URL.revokeObjectURL(url);

      const reduction = (
        (1 - compressedBlob.size / originalSize) *
        100
      ).toFixed(2);
      setStatus(t("pdfTools.compressPdf.reduction", { percent: reduction }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : t("errors.unknownError");
      setStatus(t("errors.processingFailed", { message: errorMessage }));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  };

  return (
    <div className="tool-page">
      <h1>{t("pdfTools.compressPdf.title")}</h1>
      <p>{t("pdfTools.compressPdf.description")}</p>

      <div className="tool-card">
        <div className="file-input-wrapper">
          <input
            type="file"
            id="pdf-file"
            accept=".pdf"
            onChange={handleFileChange}
          />
          <label htmlFor="pdf-file" className="file-input-label">
            {t("pdfTools.compressPdf.selectFile")}
          </label>
        </div>

        {file && (
          <div className="file-info">
            <p>已選擇: {file.name}</p>
            <p>
              {t("pdfTools.compressPdf.originalSize")}:{" "}
              {formatFileSize(originalSize)}
            </p>
            {compressedSize > 0 && (
              <p>
                {t("pdfTools.compressPdf.compressedSize")}:{" "}
                {formatFileSize(compressedSize)}
              </p>
            )}
          </div>
        )}

        <button onClick={handleCompress} disabled={!file || loading}>
          {loading
            ? t("pdfTools.compressPdf.compressing")
            : t("pdfTools.compressPdf.title")}
        </button>

        {status && (
          <div className="status-message">
            <p>{status}</p>
          </div>
        )}

        <div className="info-box" style={{ marginTop: "2rem" }}>
          <h3>功能說明</h3>
          <ul>
            <li>優化 PDF 文件結構</li>
            <li>移除未使用的對象</li>
            <li>基礎壓縮功能</li>
            <li>注意：此工具的壓縮效果有限</li>
            <li>如需更好的壓縮效果，建議使用專業的 PDF 壓縮服務</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CompressPdf;
