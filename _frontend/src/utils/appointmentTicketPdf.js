import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// Lề quanh phiếu hẹn trên trang A5.
const MARGIN_MM = 10;

/**
 * Chụp lại phần tử phiếu hẹn đang hiển thị trên màn hình rồi lưu thành file PDF.
 *
 * Dùng html2canvas (chụp hình ảnh) thay vì dựng chữ bằng jsPDF vì font mặc định của
 * jsPDF không có tiếng Việt có dấu. Chụp màn hình giữ nguyên chính xác giao diện
 * người dùng thấy, gồm cả mã QR.
 *
 * @param {HTMLElement|null} element phần tử .ticket-container cần chụp
 * @param {string} fileName tên file PDF tải về, ví dụ PhieuHen_LH001.pdf
 */
export async function downloadTicketPdf(element, fileName) {
  if (!element) {
    throw new Error("Không tìm thấy phiếu hẹn trên trang.");
  }

  const canvas = await html2canvas(element, {
    backgroundColor: "#ffffff",
    // Nhân hệ số để chữ và mã QR không bị vỡ khi in.
    scale: 3,
    useCORS: true,
    logging: false,
  });

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a5",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const availableWidth = pageWidth - MARGIN_MM * 2;
  const availableHeight = pageHeight - MARGIN_MM * 2;
  const aspectRatio = canvas.height / canvas.width;

  // Co vừa trang A5, giữ nguyên tỉ lệ, căn giữa.
  let width = availableWidth;
  let height = width * aspectRatio;
  if (height > availableHeight) {
    height = availableHeight;
    width = height / aspectRatio;
  }

  pdf.addImage(
    canvas.toDataURL("image/png"),
    "PNG",
    (pageWidth - width) / 2,
    (pageHeight - height) / 2,
    width,
    height,
  );

  pdf.save(fileName);
}
