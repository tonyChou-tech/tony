import { useEffect } from "react";

interface AdBannerProps {
  slot?: string;
  format?: string;
  responsive?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

function AdBanner({
  slot = "auto",
  format = "auto",
  responsive = "true"
}: AdBannerProps) {
  useEffect(() => {
    try {
      // 載入 AdSense 廣告
      if (window.adsbygoogle && import.meta.env.PROD) {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  // 開發環境顯示佔位符
  if (!import.meta.env.PROD) {
    return (
      <div className="ad-container">
        <p className="text-gray-500">廣告位置 (開發環境)</p>
      </div>
    );
  }

  return (
    <div className="ad-container">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      ></ins>
    </div>
  );
}

export default AdBanner;
