-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2026 at 03:34 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quanlyphongkham`
--

-- --------------------------------------------------------

--
-- Table structure for table `bacsi`
--

CREATE TABLE `bacsi` (
  `MABACSI` varchar(20) NOT NULL,
  `MANGUOIDUNG` varchar(20) NOT NULL,
  `MACHUYENKHOA` varchar(20) NOT NULL,
  `HOCVI` varchar(50) DEFAULT NULL,
  `NAMKINHNGHIEM` int(11) DEFAULT 0,
  `TIEUSU` text DEFAULT NULL,
  `PHIKHAM` decimal(12,2) DEFAULT 0.00,
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bacsi`
--

INSERT INTO `bacsi` (`MABACSI`, `MANGUOIDUNG`, `MACHUYENKHOA`, `HOCVI`, `NAMKINHNGHIEM`, `TIEUSU`, `PHIKHAM`, `TRANGTHAIXOA`) VALUES
('BS001', 'ND002', 'CK_TIM', 'Bác sĩ Chuyên khoa II', 15, 'Từng công tác tại BV Chợ Rẫy, chuyên sâu can thiệp tim mạch', 250000.00, 0),
('BS002', 'ND003', 'CK_NOI', 'Thạc sĩ Bác sĩ', 8, 'Tốt nghiệp ĐH Y Dược TP.HCM, chuyên khoa Nội tiêu hóa', 180000.00, 0),
('BS003', 'ND004', 'CK_NHI', 'Bác sĩ Đa khoa', 5, 'Kinh nghiệm 5 năm điều trị nhi khoa tổng quát', 150000.00, 0);

-- --------------------------------------------------------

--
-- Table structure for table `benhan`
--

CREATE TABLE `benhan` (
  `MABENHAN` varchar(20) NOT NULL,
  `MATIEPDON` varchar(20) NOT NULL,
  `CHUANDOAN` text DEFAULT NULL,
  `TRIEUCHUNG` text DEFAULT NULL,
  `LOIDAN` text DEFAULT NULL,
  `NGAYKHAM` date NOT NULL,
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `benhan`
--

INSERT INTO `benhan` (`MABENHAN`, `MATIEPDON`, `CHUANDOAN`, `TRIEUCHUNG`, `LOIDAN`, `NGAYKHAM`, `TRANGTHAIXOA`) VALUES
('BA001', 'TD001', 'Tăng huyết áp nguyên phát giai đoạn 2 - Rối loạn lipid máu', 'Mệt mỏi, tức ngực trái từng cơn', 'Ăn giảm muối, hạn chế dầu mỡ, tái khám sau 14 ngày', '2026-09-18', 0),
('BA002', 'TD002', 'Viêm loét dạ dày - tá tràng cấp kèm trào ngược thực quản', 'Ợ chua, đau quặn thượng vị sau khi ăn', 'Uống thuốc đúng bữa, không thức khuya, kiêng cay nóng', '2026-09-18', 0);

-- --------------------------------------------------------

--
-- Table structure for table `benhnhan`
--

CREATE TABLE `benhnhan` (
  `MABENHNHAN` varchar(20) NOT NULL,
  `MANGUOIDUNG` varchar(20) DEFAULT NULL,
  `NGAYSINH` date DEFAULT NULL,
  `GIOITINH` varchar(10) DEFAULT NULL,
  `NHOMMAU` varchar(10) DEFAULT NULL,
  `DIACHI` varchar(255) DEFAULT NULL,
  `SOBHYT` varchar(50) DEFAULT NULL,
  `TIEUSUBENHAN` text DEFAULT NULL,
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `benhnhan`
--

INSERT INTO `benhnhan` (`MABENHNHAN`, `MANGUOIDUNG`, `NGAYSINH`, `GIOITINH`, `NHOMMAU`, `DIACHI`, `SOBHYT`, `TIEUSUBENHAN`, `TRANGTHAIXOA`) VALUES
('BN001', 'ND007', '1988-05-12', 'Nam', 'O+', '123 Nguyễn Trãi, Quận 5, TP.HCM', 'DN4791234567890', 'Tăng huyết áp 2 năm, không dị ứng thuốc', 0),
('BN002', 'ND008', '1995-10-24', 'Nữ', 'A+', '456 Hai Bà Trưng, Quận 1, TP.HCM', 'DN4799876543210', 'Viêm loét dạ dày tái phát, dị ứng Penicillin', 0),
('BN003', 'ND009', '2018-03-15', 'Nam', 'B+', '789 Lê Văn Việt, TP. Thủ Đức, TP.HCM', NULL, 'Chưa ghi nhận bệnh mãn tính', 0);

-- --------------------------------------------------------

--
-- Table structure for table `chidinhdichvu`
--

CREATE TABLE `chidinhdichvu` (
  `MACHIDINH` varchar(20) NOT NULL,
  `MABENHAN` varchar(20) NOT NULL,
  `MADICHVU` varchar(20) NOT NULL,
  `SOLUONG` int(11) NOT NULL DEFAULT 1,
  `DONGIA` decimal(12,2) NOT NULL,
  `TRANGTHAI` varchar(20) DEFAULT 'DaChiDinh',
  `KETQUA` text DEFAULT NULL,
  `FILEKETQUA` varchar(255) DEFAULT NULL,
  `THOIGIANCHIDINH` timestamp NOT NULL DEFAULT current_timestamp(),
  `THOIGIANKETQUA` timestamp NULL DEFAULT NULL,
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chidinhdichvu`
--

INSERT INTO `chidinhdichvu` (`MACHIDINH`, `MABENHAN`, `MADICHVU`, `SOLUONG`, `DONGIA`, `TRANGTHAI`, `KETQUA`, `FILEKETQUA`, `THOIGIANCHIDINH`, `THOIGIANKETQUA`, `TRANGTHAIXOA`) VALUES
('CD001', 'BA001', 'DV_ECG', 1, 100000.00, 'HoanThanh', 'Nhịp xoang đều, phì đại thất trái nhẹ', '/uploads/results/ecg_ba001.pdf', '2026-09-18 01:15:00', '2026-09-18 01:45:00', 0),
('CD002', 'BA001', 'DV_ECHO', 1, 350000.00, 'HoanThanh', 'Chức năng tâm thu thất trái bảo tồn (EF = 62%), hở van 2 lá nhẹ 1/4', '/uploads/results/echo_ba001.pdf', '2026-09-18 01:15:00', '2026-09-18 02:10:00', 0),
('CD003', 'BA002', 'DV_XNBL', 1, 450000.00, 'HoanThanh', 'HP dương tính (Positive +++)', '/uploads/results/hp_ba002.pdf', '2026-09-18 01:50:00', '2026-09-18 02:25:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `chitietdonthuoc`
--

CREATE TABLE `chitietdonthuoc` (
  `MACHITIETDONTHUOC` varchar(20) NOT NULL,
  `MADONTHUOC` varchar(20) NOT NULL,
  `MATHUOC` varchar(20) NOT NULL,
  `SOLUONG` int(11) NOT NULL,
  `DONGIA` decimal(12,2) NOT NULL,
  `LIEUDUNG` varchar(50) DEFAULT NULL,
  `THANHTIEN` decimal(12,2) NOT NULL,
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chitietdonthuoc`
--

INSERT INTO `chitietdonthuoc` (`MACHITIETDONTHUOC`, `MADONTHUOC`, `MATHUOC`, `SOLUONG`, `DONGIA`, `LIEUDUNG`, `THANHTIEN`, `TRANGTHAIXOA`) VALUES
('CTDT001', 'DT001', 'TH001', 28, 10500.00, '1 viên/ngày (sáng)', 294000.00, 0),
('CTDT002', 'DT001', 'TH002', 14, 22000.00, '1 viên/ngày (tối)', 308000.00, 0),
('CTDT003', 'DT002', 'TH003', 28, 24000.00, '1 viên/ngày (sáng)', 672000.00, 0),
('CTDT004', 'DT002', 'TH004', 20, 2500.00, 'Nhai khi đau rát', 50000.00, 0);

-- --------------------------------------------------------

--
-- Table structure for table `chitiethoadon`
--

CREATE TABLE `chitiethoadon` (
  `MACHITIETHOADON` varchar(20) NOT NULL,
  `MAHOADON` varchar(20) NOT NULL,
  `LOAIMUCTHU` varchar(20) DEFAULT NULL,
  `MAMUCTHU` varchar(20) DEFAULT NULL,
  `TENMUCTHU` varchar(150) NOT NULL,
  `SOLUONG` int(11) NOT NULL DEFAULT 1,
  `DONGIA` decimal(12,2) NOT NULL,
  `THANHTIEN` decimal(12,2) NOT NULL,
  `GHICHU` text DEFAULT NULL,
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chitiethoadon`
--

INSERT INTO `chitiethoadon` (`MACHITIETHOADON`, `MAHOADON`, `LOAIMUCTHU`, `MAMUCTHU`, `TENMUCTHU`, `SOLUONG`, `DONGIA`, `THANHTIEN`, `GHICHU`, `TRANGTHAIXOA`) VALUES
('CTHD001', 'HD001', 'PhiKham', 'BS001', 'Công khám Bác sĩ CKII Tim mạch', 1, 250000.00, 250000.00, 'Tiền khám theo bác sĩ', 0),
('CTHD002', 'HD001', 'DichVu', 'DV_ECG', 'Điện tâm đồ (ECG 12 chuyển đạo)', 1, 100000.00, 100000.00, 'Chỉ định CD001', 0),
('CTHD003', 'HD001', 'DichVu', 'DV_ECHO', 'Siêu âm tim màu Doppler', 1, 350000.00, 350000.00, 'Chỉ định CD002', 0),
('CTHD004', 'HD001', 'Thuoc', 'DT001', 'Tiền đơn thuốc điều trị ngoại trú', 1, 602000.00, 602000.00, 'Tổng tiền thuốc theo đơn DT001', 0),
('CTHD005', 'HD002', 'PhiKham', 'BS002', 'Công khám Thạc sĩ BS Nội tổng quát', 1, 180000.00, 180000.00, 'Tiền khám theo bác sĩ', 0),
('CTHD006', 'HD002', 'DichVu', 'DV_XNBL', 'Xét nghiệm vi khuẩn HP qua hơi thở', 1, 450000.00, 450000.00, 'Chỉ định CD003', 0),
('CTHD007', 'HD002', 'Thuoc', 'DT002', 'Tiền đơn thuốc điều trị ngoại trú', 1, 722000.00, 722000.00, 'Tổng tiền thuốc theo đơn DT002', 0);

-- --------------------------------------------------------

--
-- Table structure for table `chuyenkhoa`
--

CREATE TABLE `chuyenkhoa` (
  `MACHUYENKHOA` varchar(20) NOT NULL,
  `TENCHUYENKHOA` varchar(100) NOT NULL,
  `MOTA` text DEFAULT NULL,
  `PHIKHAMCHUAN` decimal(12,2) DEFAULT 0.00,
  `TRANGTHAI` tinyint(1) NOT NULL DEFAULT 1,
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0,
  `NGAYTAO` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chuyenkhoa`
--

INSERT INTO `chuyenkhoa` (`MACHUYENKHOA`, `TENCHUYENKHOA`, `MOTA`, `PHIKHAMCHUAN`, `TRANGTHAI`, `TRANGTHAIXOA`, `NGAYTAO`) VALUES
('CK_NHI', 'Khoa Nhi', 'Khám và chăm sóc sức khỏe toàn diện cho trẻ em', 150000.00, 1, 0, '2026-09-18 01:33:16'),
('CK_NOI', 'Khoa Nội Tổng Quát', 'Khám, chẩn đoán và điều trị bệnh nội khoa người lớn', 150000.00, 1, 0, '2026-09-18 01:33:16'),
('CK_TAI', 'Khoa Tai Mũi Họng', 'Khám và nội soi điều trị các bệnh lý tai mũi họng', 180000.00, 1, 0, '2026-09-18 01:33:16'),
('CK_TIM', 'Khoa Tim Mạch', 'Chẩn đoán và điều trị bệnh lý tim mạch, huyết áp', 200000.00, 1, 0, '2026-09-18 01:33:16');

-- --------------------------------------------------------

--
-- Table structure for table `dichvu`
--

CREATE TABLE `dichvu` (
  `MADICHVU` varchar(20) NOT NULL,
  `MACHUYENKHOA` varchar(20) NOT NULL,
  `TENDICHVU` varchar(150) NOT NULL,
  `DONGIA` decimal(12,2) NOT NULL DEFAULT 0.00,
  `DONVITINH` varchar(20) DEFAULT NULL,
  `MOTA` text DEFAULT NULL,
  `TRANGTHAI` tinyint(1) NOT NULL DEFAULT 1,
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dichvu`
--

INSERT INTO `dichvu` (`MADICHVU`, `MACHUYENKHOA`, `TENDICHVU`, `DONGIA`, `DONVITINH`, `MOTA`, `TRANGTHAI`, `TRANGTHAIXOA`) VALUES
('DV_ECG', 'CK_TIM', 'Điện tâm đồ (ECG 12 chuyển đạo)', 100000.00, 'Lần', 'Ghi hoạt động điện của tim phát hiện rối loạn nhịp', 1, 0),
('DV_ECHO', 'CK_TIM', 'Siêu âm tim màu Doppler', 350000.00, 'Lần', 'Đánh giá cấu trúc buồng tim và huyết động van tim', 1, 0),
('DV_NSDD', 'CK_NOI', 'Nội soi dạ dày gây mê', 900000.00, 'Lần', 'Nội soi đường tiêu hóa trên phát hiện loét, polyp', 1, 0),
('DV_XNBL', 'CK_NOI', 'Xét nghiệm vi khuẩn HP qua hơi thở (Urea Breath Test)', 450000.00, 'Lần', 'Kiểm tra nhiễm Helicobacter pylori đường dạ dày', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `donthuoc`
--

CREATE TABLE `donthuoc` (
  `MADONTHUOC` varchar(20) NOT NULL,
  `MABENHAN` varchar(20) NOT NULL,
  `NGAYKEDON` date NOT NULL,
  `LOIDAN` text DEFAULT NULL,
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `donthuoc`
--

INSERT INTO `donthuoc` (`MADONTHUOC`, `MABENHAN`, `NGAYKEDON`, `LOIDAN`, `TRANGTHAIXOA`) VALUES
('DT001', 'BA001', '2026-09-18', 'Uống đều mỗi ngày không tự ý ngưng thuốc hạ áp', 0),
('DT002', 'BA002', '2026-09-18', 'Kiên trì dùng đủ đợt điều trị kháng tiết axit', 0);

-- --------------------------------------------------------

--
-- Table structure for table `hoadon`
--

CREATE TABLE `hoadon` (
  `MAHOADON` varchar(20) NOT NULL,
  `MABENHAN` varchar(20) NOT NULL,
  `MANHANVIEN` varchar(20) NOT NULL,
  `TIENKHACHDUA` decimal(12,2) DEFAULT 0.00,
  `TIENTHOILAI` decimal(12,2) DEFAULT 0.00,
  `TONGTIEN` decimal(12,2) NOT NULL DEFAULT 0.00,
  `PHUONGTHUCTHANHTOAN` varchar(20) DEFAULT NULL,
  `TRANGTHAITHANHTOAN` varchar(20) DEFAULT 'ChuaThanhToan',
  `THOIGIANTHANHTOAN` timestamp NULL DEFAULT NULL,
  `NGAYTAO` timestamp NOT NULL DEFAULT current_timestamp(),
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hoadon`
--

INSERT INTO `hoadon` (`MAHOADON`, `MABENHAN`, `MANHANVIEN`, `TIENKHACHDUA`, `TIENTHOILAI`, `TONGTIEN`, `PHUONGTHUCTHANHTOAN`, `TRANGTHAITHANHTOAN`, `THOIGIANTHANHTOAN`, `NGAYTAO`, `TRANGTHAIXOA`) VALUES
('HD001', 'BA001', 'NV002', 1400000.00, 98000.00, 1302000.00, 'TienMat', 'DaThanhToan', '2026-09-18 02:40:00', '2026-09-18 01:33:17', 0),
('HD002', 'BA002', 'NV002', 1352000.00, 0.00, 1352000.00, 'ChuyenKhoan', 'DaThanhToan', '2026-09-18 03:15:00', '2026-09-18 01:33:17', 0);

-- --------------------------------------------------------

--
-- Table structure for table `lichhenkham`
--

CREATE TABLE `lichhenkham` (
  `MALICHHEN` varchar(20) NOT NULL,
  `MABENHNHAN` varchar(20) NOT NULL,
  `MABACSI` varchar(20) NOT NULL,
  `MALICHTRUC` varchar(20) DEFAULT NULL,
  `NGAYHEN` date NOT NULL,
  `GIOHEN` time NOT NULL,
  `LYDOKHAM` text DEFAULT NULL,
  `NGAYTAO` timestamp NOT NULL DEFAULT current_timestamp(),
  `TRANGTHAI` varchar(20) DEFAULT 'DaDat',
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lichhenkham`
--

INSERT INTO `lichhenkham` (`MALICHHEN`, `MABENHNHAN`, `MABACSI`, `MALICHTRUC`, `NGAYHEN`, `GIOHEN`, `LYDOKHAM`, `NGAYTAO`, `TRANGTHAI`, `TRANGTHAIXOA`) VALUES
('LH001', 'BN001', 'BS001', 'LT001', '2026-09-18', '08:00:00', 'Đau thắt ngực khi gắng sức, chóng mặt', '2026-09-18 01:33:16', 'DaDen', 0),
('LH002', 'BN002', 'BS002', 'LT002', '2026-09-18', '08:30:00', 'Đau rát vùng thượng vị nhiều ngày qua', '2026-09-18 01:33:16', 'DaDen', 0),
('LH003', 'BN003', 'BS003', 'LT003', '2026-09-18', '14:00:00', 'Sốt cao, ho có đờm', '2026-09-18 01:33:16', 'DaDat', 0);

-- --------------------------------------------------------

--
-- Table structure for table `lichtrucbacsi`
--

CREATE TABLE `lichtrucbacsi` (
  `MALICHTRUC` varchar(20) NOT NULL,
  `MABACSI` varchar(20) NOT NULL,
  `MAPHONG` varchar(20) NOT NULL,
  `NGAYKHAM` date NOT NULL,
  `GIOBATDAU` time NOT NULL,
  `GIOKETTHUC` time NOT NULL,
  `SOLUONGTOIDA` int(11) DEFAULT 30,
  `TRANGTHAI` varchar(20) DEFAULT 'MoDangKy',
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lichtrucbacsi`
--

INSERT INTO `lichtrucbacsi` (`MALICHTRUC`, `MABACSI`, `MAPHONG`, `NGAYKHAM`, `GIOBATDAU`, `GIOKETTHUC`, `SOLUONGTOIDA`, `TRANGTHAI`, `TRANGTHAIXOA`) VALUES
('LT001', 'BS001', 'PK102', '2026-09-18', '07:30:00', '11:30:00', 25, 'MoDangKy', 0),
('LT002', 'BS002', 'PK101', '2026-09-18', '07:30:00', '11:30:00', 30, 'MoDangKy', 0),
('LT003', 'BS003', 'PK201', '2026-09-18', '13:30:00', '17:00:00', 20, 'MoDangKy', 0);

-- --------------------------------------------------------

--
-- Table structure for table `nguoidung`
--

CREATE TABLE `nguoidung` (
  `MANGUOIDUNG` varchar(20) NOT NULL,
  `TENDANGNHAP` varchar(50) NOT NULL,
  `MATKHAU` varchar(255) NOT NULL,
  `HOTEN` varchar(100) NOT NULL,
  `EMAIL` varchar(100) DEFAULT NULL,
  `SODIENTHOAI` varchar(10) DEFAULT NULL,
  -- `VAITRO` enum('ADMIN','DOCTOR','STAFF','PATIENT') NOT NULL,
  `VAITRO` tinyint(1) NOT NULL,  
  `TRANGTHAI` tinyint(1) NOT NULL DEFAULT 1,
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0,
  `NGAYTAO` timestamp NOT NULL DEFAULT current_timestamp(),
  `NGAYCAPNHAT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `nguoidung`
--

INSERT INTO `nguoidung` (`MANGUOIDUNG`, `TENDANGNHAP`, `MATKHAU`, `HOTEN`, `EMAIL`, `SODIENTHOAI`, `VAITRO`, `TRANGTHAI`, `TRANGTHAIXOA`, `NGAYTAO`, `NGAYCAPNHAT`) VALUES
('ND001', 'admin', '$2y$10$hashedAdminPasswordHere123456', 'Nguyễn Quản Trị', 'admin@clinic.vn', '0901000001', 3, 1, 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16'),
('ND002', 'dr_nam', '$2y$10$hashedDoctorPasswordHere123456', 'BS.CKII Trần Văn Nam', 'nam.tv@clinic.vn', '0902000002', 2, 1, 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16'),
('ND003', 'dr_lan', '$2y$10$hashedDoctorPasswordHere123456', 'ThS.BS Lê Thị Lan', 'lan.lt@clinic.vn', '0903000003', 2, 1, 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16'),
-- Password123!
('ND004', 'dr_duc', '\$2a\$10\$e0MYzXy6HJ9G7jU98vM6eO3mBszKlmA1XFmK29Fq7E1F61B2O6X2a', 'BS Phạm Minh Đức', 'duc.pm@clinic.vn', '0904000004', 2, 1, 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16'),
('ND005', 'nv_mai', '$2y$10$hashedStaffPasswordHere123456', 'Hoàng Tuyết Mai', 'mai.ht@clinic.vn', '0905000005', 1, 1, 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16'),
('ND006', 'nv_hung', '$2y$10$hashedStaffPasswordHere123456', 'Vũ Quốc Hùng', 'hung.vq@clinic.vn', '0906000006', 1, 1, 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16'),
('ND007', 'bn_an', '$2y$10$hashedPatientPasswordHere123456', 'Nguyễn Văn An', 'an.nguyen@gmail.com', '0912345678', 0, 1, 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16'),
('ND008', 'bn_binh', '$2y$10$hashedPatientPasswordHere123456', 'Trần Thị Bình', 'binh.tran@gmail.com', '0913456789', 0, 1, 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16'),
('ND009', 'bn_cuong', '$2y$10$hashedPatientPasswordHere123456', 'Lê Hùng Cường', 'cuong.le@gmail.com', '0914567890', 0, 1, 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16');

-- --------------------------------------------------------

--
-- Table structure for table `nhanvien`
--

CREATE TABLE `nhanvien` (
  `MANHANVIEN` varchar(20) NOT NULL,
  `MANGUOIDUNG` varchar(20) NOT NULL,
  `VITRI` varchar(50) DEFAULT NULL,
  `NGAYVAOLAM` date DEFAULT NULL,
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `nhanvien`
--

INSERT INTO `nhanvien` (`MANHANVIEN`, `MANGUOIDUNG`, `VITRI`, `NGAYVAOLAM`, `TRANGTHAIXOA`) VALUES
('NV001', 'ND005', 'Lễ tân tiếp đón', '2023-01-15', 0),
('NV002', 'ND006', 'Thu ngân viện phí', '2023-03-01', 0);

-- --------------------------------------------------------

--
-- Table structure for table `phongkham`
--

CREATE TABLE `phongkham` (
  `MAPHONG` varchar(20) NOT NULL,
  `MACHUYENKHOA` varchar(20) NOT NULL,
  `SOPHONG` varchar(20) NOT NULL,
  `TENPHONG` varchar(100) NOT NULL,
  `TANG` varchar(20) DEFAULT NULL,
  `TRANGTHAI` varchar(20) DEFAULT 'HoatDong',
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `phongkham`
--

INSERT INTO `phongkham` (`MAPHONG`, `MACHUYENKHOA`, `SOPHONG`, `TENPHONG`, `TANG`, `TRANGTHAI`, `TRANGTHAIXOA`) VALUES
('PK101', 'CK_NOI', 'P.101', 'Phòng Khám Nội 1', 'Tầng 1', 'HoatDong', 0),
('PK102', 'CK_TIM', 'P.102', 'Phòng Khám Tim Mạch', 'Tầng 1', 'HoatDong', 0),
('PK201', 'CK_NHI', 'P.201', 'Phòng Khám Nhi Đồng', 'Tầng 2', 'HoatDong', 0),
('PKCL01', 'CK_NOI', 'P.CL01', 'Phòng Xét Nghiệm - Siêu Âm', 'Tầng Trệt', 'HoatDong', 0);

-- --------------------------------------------------------

--
-- Table structure for table `thuoc`
--

CREATE TABLE `thuoc` (
  `MATHUOC` varchar(20) NOT NULL,
  `TENTHUOC` varchar(150) NOT NULL,
  `HOATCHAT` varchar(150) DEFAULT NULL,
  `DONVITINH` varchar(20) DEFAULT NULL,
  `DONGIA` decimal(12,2) NOT NULL DEFAULT 0.00,
  `SOLUONGTON` int(11) NOT NULL DEFAULT 0,
  `HUONGDANDUNG` varchar(255) DEFAULT NULL,
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `thuoc`
--

INSERT INTO `thuoc` (`MATHUOC`, `TENTHUOC`, `HOATCHAT`, `DONVITINH`, `DONGIA`, `SOLUONGTON`, `HUONGDANDUNG`, `TRANGTHAIXOA`) VALUES
('TH001', 'Amlor 5mg', 'Amlodipine besylate', 'Viên', 10500.00, 1500, 'Uống 1 viên vào mỗi buổi sáng sau ăn', 0),
('TH002', 'Lipitor 20mg', 'Atorvastatin', 'Viên', 22000.00, 800, 'Uống 1 viên buổi tối trước khi đi ngủ', 0),
('TH003', 'Nexium 40mg', 'Esomeprazole', 'Viên', 24000.00, 1200, 'Uống 1 viên trước ăn sáng 30 phút', 0),
('TH004', 'Kremil-S', 'Aluminium hydroxide + Simethicone', 'Viên', 2500.00, 2000, 'Nhai 1 viên sau ăn khi xuất hiện đau rát hoặc ợ chua', 0),
('TH005', 'Amoxicillin 500mg', 'Amoxicillin trihydrate', 'Viên', 4000.00, 3000, 'Uống 1 viên x 2 lần/ngày sau khi ăn', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tiepdonkham`
--

CREATE TABLE `tiepdonkham` (
  `MATIEPDON` varchar(20) NOT NULL,
  `MABENHNHAN` varchar(20) NOT NULL,
  `MANHANVIEN` varchar(20) NOT NULL,
  `MAPHONG` varchar(20) NOT NULL,
  `MABACSI` varchar(20) NOT NULL,
  `MALICHHEN` varchar(20) DEFAULT NULL,
  `NGAYTIEPDON` date NOT NULL,
  `SOTHUTU` int(11) NOT NULL,
  `LOAITIEPDON` varchar(20) DEFAULT NULL,
  `TRANGTHAIHANGDOI` varchar(20) DEFAULT 'ChoKham',
  `TRIEUTRUNGBANDAU` text DEFAULT NULL,
  `MACH` int(11) DEFAULT NULL,
  `NHIETDO` decimal(4,1) DEFAULT NULL,
  `HUYETAP` varchar(20) DEFAULT NULL,
  `CANNANG` decimal(5,2) DEFAULT NULL,
  `CHIEUCAO` decimal(5,2) DEFAULT NULL,
  `XTHOIGIANTIEPDON` timestamp NOT NULL DEFAULT current_timestamp(),
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tiepdonkham`
--

INSERT INTO `tiepdonkham` (`MATIEPDON`, `MABENHNHAN`, `MANHANVIEN`, `MAPHONG`, `MABACSI`, `MALICHHEN`, `NGAYTIEPDON`, `SOTHUTU`, `LOAITIEPDON`, `TRANGTHAIHANGDOI`, `TRIEUTRUNGBANDAU`, `MACH`, `NHIETDO`, `HUYETAP`, `CANNANG`, `CHIEUCAO`, `XTHOIGIANTIEPDON`, `TRANGTHAIXOA`) VALUES
('TD001', 'BN001', 'NV001', 'PK102', 'BS001', 'LH001', '2026-09-18', 1, 'HenTruoc', 'DaKham', 'Đau tức ngực, hồi hộp khó thở nhẹ', 82, 36.8, '140/90', 68.50, 168.00, '2026-09-18 01:33:16', 0),
('TD002', 'BN002', 'NV001', 'PK101', 'BS002', 'LH002', '2026-09-18', 2, 'HenTruoc', 'DaKham', 'Đau vùng thượng vị âm ỉ, buồn nôn', 76, 37.0, '115/75', 52.00, 158.00, '2026-09-18 01:33:16', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bacsi`
--
ALTER TABLE `bacsi`
  ADD PRIMARY KEY (`MABACSI`),
  ADD KEY `FK_BACSI_NGUOIDUNG` (`MANGUOIDUNG`),
  ADD KEY `FK_BACSI_CHUYENKHOA` (`MACHUYENKHOA`);

--
-- Indexes for table `benhan`
--
ALTER TABLE `benhan`
  ADD PRIMARY KEY (`MABENHAN`),
  ADD UNIQUE KEY `MATIEPDON` (`MATIEPDON`);

--
-- Indexes for table `benhnhan`
--
ALTER TABLE `benhnhan`
  ADD PRIMARY KEY (`MABENHNHAN`),
  ADD KEY `FK_BENHNHAN_NGUOIDUNG` (`MANGUOIDUNG`);

--
-- Indexes for table `chidinhdichvu`
--
ALTER TABLE `chidinhdichvu`
  ADD PRIMARY KEY (`MACHIDINH`),
  ADD KEY `FK_CDDV_BENHAN` (`MABENHAN`),
  ADD KEY `FK_CDDV_DICHVU` (`MADICHVU`);

--
-- Indexes for table `chitietdonthuoc`
--
ALTER TABLE `chitietdonthuoc`
  ADD PRIMARY KEY (`MACHITIETDONTHUOC`),
  ADD KEY `FK_CTDT_DONTHUOC` (`MADONTHUOC`),
  ADD KEY `FK_CTDT_THUOC` (`MATHUOC`);

--
-- Indexes for table `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD PRIMARY KEY (`MACHITIETHOADON`),
  ADD KEY `FK_CTHD_HOADON` (`MAHOADON`);

--
-- Indexes for table `chuyenkhoa`
--
ALTER TABLE `chuyenkhoa`
  ADD PRIMARY KEY (`MACHUYENKHOA`);

--
-- Indexes for table `dichvu`
--
ALTER TABLE `dichvu`
  ADD PRIMARY KEY (`MADICHVU`),
  ADD KEY `FK_DICHVU_CHUYENKHOA` (`MACHUYENKHOA`);

--
-- Indexes for table `donthuoc`
--
ALTER TABLE `donthuoc`
  ADD PRIMARY KEY (`MADONTHUOC`),
  ADD KEY `FK_DONTHUOC_BENHAN` (`MABENHAN`);

--
-- Indexes for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`MAHOADON`),
  ADD KEY `FK_HOADON_BENHAN` (`MABENHAN`),
  ADD KEY `FK_HOADON_NHANVIEN` (`MANHANVIEN`);

--
-- Indexes for table `lichhenkham`
--
ALTER TABLE `lichhenkham`
  ADD PRIMARY KEY (`MALICHHEN`),
  ADD KEY `FK_LICHHEN_BENHNHAN` (`MABENHNHAN`),
  ADD KEY `FK_LICHHEN_BACSI` (`MABACSI`),
  ADD KEY `FK_LICHHEN_LICHTRUC` (`MALICHTRUC`);

--
-- Indexes for table `lichtrucbacsi`
--
ALTER TABLE `lichtrucbacsi`
  ADD PRIMARY KEY (`MALICHTRUC`),
  ADD KEY `FK_LICHTRUC_BACSI` (`MABACSI`),
  ADD KEY `FK_LICHTRUC_PHONGKHAM` (`MAPHONG`);

--
-- Indexes for table `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`MANGUOIDUNG`),
  ADD UNIQUE KEY `TENDANGNHAP` (`TENDANGNHAP`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`);

--
-- Indexes for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`MANHANVIEN`),
  ADD KEY `FK_NHANVIEN_NGUOIDUNG` (`MANGUOIDUNG`);

--
-- Indexes for table `phongkham`
--
ALTER TABLE `phongkham`
  ADD PRIMARY KEY (`MAPHONG`),
  ADD KEY `FK_PHONGKHAM_CHUYENKHOA` (`MACHUYENKHOA`);

--
-- Indexes for table `thuoc`
--
ALTER TABLE `thuoc`
  ADD PRIMARY KEY (`MATHUOC`);

--
-- Indexes for table `tiepdonkham`
--
ALTER TABLE `tiepdonkham`
  ADD PRIMARY KEY (`MATIEPDON`),
  ADD KEY `FK_TIEPDON_BENHNHAN` (`MABENHNHAN`),
  ADD KEY `FK_TIEPDON_NHANVIEN` (`MANHANVIEN`),
  ADD KEY `FK_TIEPDON_PHONGKHAM` (`MAPHONG`),
  ADD KEY `FK_TIEPDON_BACSI` (`MABACSI`),
  ADD KEY `FK_TIEPDON_LICHHEN` (`MALICHHEN`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bacsi`
--
ALTER TABLE `bacsi`
  ADD CONSTRAINT `FK_BACSI_CHUYENKHOA` FOREIGN KEY (`MACHUYENKHOA`) REFERENCES `chuyenkhoa` (`MACHUYENKHOA`),
  ADD CONSTRAINT `FK_BACSI_NGUOIDUNG` FOREIGN KEY (`MANGUOIDUNG`) REFERENCES `nguoidung` (`MANGUOIDUNG`);

--
-- Constraints for table `benhan`
--
ALTER TABLE `benhan`
  ADD CONSTRAINT `FK_BENHAN_TIEPDON` FOREIGN KEY (`MATIEPDON`) REFERENCES `tiepdonkham` (`MATIEPDON`);

--
-- Constraints for table `benhnhan`
--
ALTER TABLE `benhnhan`
  ADD CONSTRAINT `FK_BENHNHAN_NGUOIDUNG` FOREIGN KEY (`MANGUOIDUNG`) REFERENCES `nguoidung` (`MANGUOIDUNG`);

--
-- Constraints for table `chidinhdichvu`
--
ALTER TABLE `chidinhdichvu`
  ADD CONSTRAINT `FK_CDDV_BENHAN` FOREIGN KEY (`MABENHAN`) REFERENCES `benhan` (`MABENHAN`),
  ADD CONSTRAINT `FK_CDDV_DICHVU` FOREIGN KEY (`MADICHVU`) REFERENCES `dichvu` (`MADICHVU`);

--
-- Constraints for table `chitietdonthuoc`
--
ALTER TABLE `chitietdonthuoc`
  ADD CONSTRAINT `FK_CTDT_DONTHUOC` FOREIGN KEY (`MADONTHUOC`) REFERENCES `donthuoc` (`MADONTHUOC`),
  ADD CONSTRAINT `FK_CTDT_THUOC` FOREIGN KEY (`MATHUOC`) REFERENCES `thuoc` (`MATHUOC`);

--
-- Constraints for table `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD CONSTRAINT `FK_CTHD_HOADON` FOREIGN KEY (`MAHOADON`) REFERENCES `hoadon` (`MAHOADON`);

--
-- Constraints for table `dichvu`
--
ALTER TABLE `dichvu`
  ADD CONSTRAINT `FK_DICHVU_CHUYENKHOA` FOREIGN KEY (`MACHUYENKHOA`) REFERENCES `chuyenkhoa` (`MACHUYENKHOA`);

--
-- Constraints for table `donthuoc`
--
ALTER TABLE `donthuoc`
  ADD CONSTRAINT `FK_DONTHUOC_BENHAN` FOREIGN KEY (`MABENHAN`) REFERENCES `benhan` (`MABENHAN`);

--
-- Constraints for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `FK_HOADON_BENHAN` FOREIGN KEY (`MABENHAN`) REFERENCES `benhan` (`MABENHAN`),
  ADD CONSTRAINT `FK_HOADON_NHANVIEN` FOREIGN KEY (`MANHANVIEN`) REFERENCES `nhanvien` (`MANHANVIEN`);

--
-- Constraints for table `lichhenkham`
--
ALTER TABLE `lichhenkham`
  ADD CONSTRAINT `FK_LICHHEN_BACSI` FOREIGN KEY (`MABACSI`) REFERENCES `bacsi` (`MABACSI`),
  ADD CONSTRAINT `FK_LICHHEN_BENHNHAN` FOREIGN KEY (`MABENHNHAN`) REFERENCES `benhnhan` (`MABENHNHAN`),
  ADD CONSTRAINT `FK_LICHHEN_LICHTRUC` FOREIGN KEY (`MALICHTRUC`) REFERENCES `lichtrucbacsi` (`MALICHTRUC`);

--
-- Constraints for table `lichtrucbacsi`
--
ALTER TABLE `lichtrucbacsi`
  ADD CONSTRAINT `FK_LICHTRUC_BACSI` FOREIGN KEY (`MABACSI`) REFERENCES `bacsi` (`MABACSI`),
  ADD CONSTRAINT `FK_LICHTRUC_PHONGKHAM` FOREIGN KEY (`MAPHONG`) REFERENCES `phongkham` (`MAPHONG`);

--
-- Constraints for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD CONSTRAINT `FK_NHANVIEN_NGUOIDUNG` FOREIGN KEY (`MANGUOIDUNG`) REFERENCES `nguoidung` (`MANGUOIDUNG`);

--
-- Constraints for table `phongkham`
--
ALTER TABLE `phongkham`
  ADD CONSTRAINT `FK_PHONGKHAM_CHUYENKHOA` FOREIGN KEY (`MACHUYENKHOA`) REFERENCES `chuyenkhoa` (`MACHUYENKHOA`);

--
-- Constraints for table `tiepdonkham`
--
ALTER TABLE `tiepdonkham`
  ADD CONSTRAINT `FK_TIEPDON_BACSI` FOREIGN KEY (`MABACSI`) REFERENCES `bacsi` (`MABACSI`),
  ADD CONSTRAINT `FK_TIEPDON_BENHNHAN` FOREIGN KEY (`MABENHNHAN`) REFERENCES `benhnhan` (`MABENHNHAN`),
  ADD CONSTRAINT `FK_TIEPDON_LICHHEN` FOREIGN KEY (`MALICHHEN`) REFERENCES `lichhenkham` (`MALICHHEN`),
  ADD CONSTRAINT `FK_TIEPDON_NHANVIEN` FOREIGN KEY (`MANHANVIEN`) REFERENCES `nhanvien` (`MANHANVIEN`),
  ADD CONSTRAINT `FK_TIEPDON_PHONGKHAM` FOREIGN KEY (`MAPHONG`) REFERENCES `phongkham` (`MAPHONG`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
