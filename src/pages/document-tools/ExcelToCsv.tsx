import { useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";

function ExcelToCsv() {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [sheets, setSheets] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (
      selectedFile &&
      (selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        selectedFile.type === "application/vnd.ms-excel" ||
        selectedFile.name.endsWith(".xlsx") ||
        selectedFile.name.endsWith(".xls"))
    ) {
      setFile(selectedFile);
      setStatus("");
      setSheets([]);
      setSelectedSheet("");
      loadSheetNames(selectedFile);
    } else {
      setStatus(t("errors.invalidFile"));
    }
  };

  const loadSheetNames = async (file: File) => {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheetNames = workbook.SheetNames;
      setSheets(sheetNames);
      setSelectedSheet(sheetNames[0] || "");
    } catch (error) {
      console.error("Error loading sheet names:", error);
      setStatus("無法讀取工作表");
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setStatus(t("errors.fileRequired"));
      return;
    }

    if (!selectedSheet) {
      setStatus("請選擇要轉換的工作表");
      return;
    }

    setLoading(true);
    setStatus(t("common.processing"));

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[selectedSheet];

      if (!worksheet) {
        throw new Error("找不到選擇的工作表");
      }

      // 轉換為 CSV
      const csv = XLSX.utils.sheet_to_csv(worksheet);

      // 創建並下載 CSV 文件
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name.replace(/\.(xlsx?|xls)$/i, ".csv");
      link.click();

      URL.revokeObjectURL(url);
      setStatus(t("common.success"));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : t("errors.unknownError");
      setStatus(t("errors.processingFailed", { message: errorMessage }));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <h1>{t("documentTools.excelToCsv.title")}</h1>
      <p>{t("documentTools.excelToCsv.description")}</p>

      <div className="tool-card">
        <div className="file-input-wrapper">
          <input
            type="file"
            id="excel-file"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
          />
          <label htmlFor="excel-file" className="file-input-label">
            {t("documentTools.excelToCsv.selectFile")}
          </label>
        </div>

        {file && (
          <div className="file-info">
            <p>已選擇: {file.name}</p>
            <p>大小: {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}

        {sheets.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <label
              htmlFor="sheet-select"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              選擇工作表：
            </label>
            <select
              id="sheet-select"
              value={selectedSheet}
              onChange={(e) => setSelectedSheet(e.target.value)}
              style={{
                padding: "0.5rem",
                fontSize: "1rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "100%",
                maxWidth: "300px"
              }}
            >
              {sheets.map((sheet) => (
                <option key={sheet} value={sheet}>
                  {sheet}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={handleConvert}
          disabled={!file || !selectedSheet || loading}
        >
          {loading
            ? t("common.processing")
            : t("documentTools.excelToCsv.convert")}
        </button>

        {status && (
          <div className="status-message">
            <p>{status}</p>
          </div>
        )}

        <div className="info-box" style={{ marginTop: "2rem" }}>
          <h3>功能說明</h3>
          <ul>
            <li>支援 Excel 文件 (.xls, .xlsx)</li>
            <li>可選擇特定工作表進行轉換</li>
            <li>輸出為 CSV 格式</li>
            <li>CSV 格式可被大多數程式讀取</li>
            <li>所有處理都在瀏覽器本地完成</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ExcelToCsv;
