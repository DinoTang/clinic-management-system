
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const READER_ELEMENT_ID = "checkin-qr-reader";

function scanBoxSize(viewfinderWidth, viewfinderHeight) {
    const size = Math.max(
        50,
        Math.floor(Math.min(viewfinderWidth, viewfinderHeight) * 0.7)
    );
    return { width: size, height: size };
}

function QrCheckInScanner({ onDecoded, onClose }) {
    const [cameras, setCameras] = useState([]);
    const [cameraId, setCameraId] = useState("");
    const [error, setError] = useState("");
    const [status, setStatus] = useState("starting");

    const decodedRef = useRef(false);
    const onDecodedRef = useRef(onDecoded);
    const scannerTaskRef = useRef(Promise.resolve());

    useEffect(() => {
        onDecodedRef.current = onDecoded;
    }, [onDecoded]);

    // Lấy danh sách camera và ưu tiên webcam thật.
    useEffect(() => {
        let cancelled = false;

        Html5Qrcode.getCameras()
            .then((list) => {
                if (cancelled) return;

                if (!list?.length) {
                    setError("Không tìm thấy webcam trên máy tính.");
                    setStatus("failed");
                    return;
                }

                setCameras(list);

                const preferredCamera =
                    list.find((camera) =>
                        /integrated webcam|built-in webcam|webcam tích hợp/i.test(
                            camera.label || ""
                        )
                    ) || list.find((camera) => !/obs virtual camera/i.test(
                        camera.label || ""
                    )) || list[0];

                setCameraId(preferredCamera.id);
            })
            .catch((err) => {
                if (cancelled) return;
                setStatus("failed");
                setError(
                    "Không truy cập được webcam: " +
                    (err?.message || String(err))
                );
            });

        return () => {
            cancelled = true;
        };
    }, []);

    // Khởi tạo camera tuần tự, tránh start/stop chồng chéo.
    useEffect(() => {
        if (!cameraId) return undefined;

        let cancelled = false;
        let scanner = null;

        const previousTask = scannerTaskRef.current;

        const startTask = previousTask
            .catch(() => {})
            .then(async () => {
                if (cancelled) return;

                scanner = new Html5Qrcode(READER_ELEMENT_ID, {
                    verbose: false,
                });

                try {
                    await scanner.start(
                        cameraId,
                        { fps: 10, qrbox: scanBoxSize },
                        (decodedText) => {
                            if (cancelled || decodedRef.current) return;
                            decodedRef.current = true;
                            onDecodedRef.current?.(decodedText);
                        },
                        () => {}
                    );

                    if (cancelled) {
                        if (scanner.isScanning) await scanner.stop();
                        return;
                    }

                    setStatus("ready");
                    setError("");
                } catch (err) {
                    if (!cancelled) {
                        setStatus("failed");
                        setError(
                            "Không mở được webcam: " +
                            (err?.message || String(err))
                        );
                    }
                }
            });

        scannerTaskRef.current = startTask;

        return () => {
            cancelled = true;

            // Chờ start hoàn tất rồi mới stop/clear.
            const cleanupTask = startTask
                .catch(() => {})
                .then(async () => {
                    if (!scanner) return;

                    try {
                        if (scanner.isScanning) {
                            await scanner.stop();
                        }
                    } catch (err) {
                        console.warn("Lỗi khi dừng scanner:", err);
                    }

                    try {
                        scanner.clear();
                    } catch (err) {
                        console.warn("Lỗi khi xóa scanner:", err);
                    }
                });

            scannerTaskRef.current = cleanupTask;
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

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                >
                    Đóng
                </button>
            </div>
        </div>
    );
}

export default QrCheckInScanner;
