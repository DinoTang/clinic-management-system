import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const READER_ELEMENT_ID = "checkin-qr-reader";

/**
 * Khung quét phải luôn nhỏ hơn khung hình thật, nếu không thư viện sẽ bỏ qua
 * phần tô mờ và người dùng không thấy vùng cần đặt mã QR.
 */
function scanBoxSize(viewfinderWidth, viewfinderHeight) {
  const shortestSide = Math.min(viewfinderWidth, viewfinderHeight);
  const size = Math.max(50, Math.floor(shortestSide * 0.7));
  return { width: size, height: size };
}

/**
 * Hộp thoại quét mã QR lịch hẹn bằng webcam của máy tính.
 * Khi đọc được mã, gọi onDecoded(decodedText) đúng một lần rồi để trang cha đóng hộp thoại.
 */
function QrCheckInScanner({ onDecoded, onClose }) {
  const [cameras, setCameras] = useState([]);
  const [cameraId, setCameraId] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("starting");
  const decodedRef = useRef(false);
  const onDecodedRef = useRef(onDecoded);

  useEffect(() => {
    onDecodedRef.current = onDecoded;
  }, [onDecoded]);

  // Liệt kê camera khả dụng (trình duyệt sẽ hỏi quyền truy cập webcam ở bước này).
  useEffect(() => {
    let cancelled = false;

    Html5Qrcode.getCameras()
      .then((list) => {
        if (cancelled) return;
        if (!list || list.length === 0) {
          setError("Không tìm thấy webcam nào trên máy tính này.");
          return;
        }
        setCameras(list);
        // Webcam rời/camera sau thường nằm cuối danh sách — phù hợp để quét phiếu giấy.
        setCameraId(list[list.length - 1].id);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          "Không truy cập được webcam. Hãy kiểm tra quyền camera của ứng dụng. " +
            (err?.message || ""),
        );
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Khởi động / đổi camera.
  useEffect(() => {
    if (!cameraId) return undefined;

    const scanner = new Html5Qrcode(READER_ELEMENT_ID, { verbose: false });
    let cancelled = false;

    scanner
      .start(
        cameraId,
        { fps: 10, qrbox: scanBoxSize },
        (decodedText) => {
          if (cancelled || decodedRef.current) return;
          decodedRef.current = true;
          onDecodedRef.current?.(decodedText);
        },
        () => {
          // Bỏ qua lỗi từng khung hình khi chưa nhận diện được mã.
        },
      )
      .then(() => {
        if (!cancelled) setStatus("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        setStatus("failed");
        setError(
          "Không mở được webcam: " + (err?.message || String(err)),
        );
      });

    return () => {
      cancelled = true;
      scanner
        .stop()
        .catch(() => {})
        .finally(() => {
          try {
            scanner.clear();
          } catch {
            // Trình quét đang dừng, bỏ qua.
          }
        });
    };
  }, [cameraId]);

  return (
    <div className="modal-overlay">
      <div className="qr-scan-card">
        <h3>📷 QUÉT MÃ QR LỊCH HẸN</h3>
        <p className="qr-scan-hint">
          Đưa mã QR trên phiếu hẹn của bệnh nhân vào giữa khung hình.
        </p>

        <div className="qr-scan-frame">
          <div id={READER_ELEMENT_ID} />
          {status === "starting" && (
            <p className="qr-scan-status">Đang mở camera…</p>
          )}
        </div>

        {error && <p className="qr-scan-error">{error}</p>}

        {cameras.length > 1 && (
          <label className="qr-scan-camera">
            <span>Camera:</span>
            <select
              className="form-control"
              value={cameraId}
              onChange={(e) => {
                setStatus("starting");
                setError("");
                setCameraId(e.target.value);
              }}
            >
              {cameras.map((camera, index) => (
                <option key={camera.id} value={camera.id}>
                  {camera.label || `Camera ${index + 1}`}
                </option>
              ))}
            </select>
          </label>
        )}

        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
}

export default QrCheckInScanner;
