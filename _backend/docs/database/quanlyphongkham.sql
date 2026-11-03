-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 25, 2026 at 03:42 PM
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
('BS001', 'ND002', 'CK_TIM', 'Bác sĩ Chuyên khoa II', 15, 'Từng công tác tại BV Chợ Rẫy, chuyên sâu can thiệp tim mạch', 0.00, 0),
('BS002', 'ND003', 'CK_NOI', 'Thạc sĩ Bác sĩ', 8, 'Tốt nghiệp ĐH Y Dược TP.HCM, chuyên khoa Nội tiêu hóa', 0.00, 0),
('BS003', 'ND004', 'CK_NHI', 'Bác sĩ Đa khoa', 5, 'Kinh nghiệm 5 năm điều trị nhi khoa tổng quát', 0.00, 0);

-- --------------------------------------------------------

--
-- Table structure for table `benhan`
--

CREATE TABLE `benhan` (
  `MABENHAN` varchar(20) NOT NULL,
  `MATIEPDON` varchar(20) NOT NULL,
  `CHUANDOAN` text DEFAULT NULL,
  `TRIEUCHUNG` text DEFAULT NULL,
  `TOANTHAN` text DEFAULT NULL,
  `TAICHUA` text DEFAULT NULL,
  `LOIDAN` text DEFAULT NULL,
  `TIENLUONG` text DEFAULT NULL,
  `NGAYKHAM` date NOT NULL,
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `benhan`
--

INSERT INTO `benhan` (`MABENHAN`, `MATIEPDON`, `CHUANDOAN`, `TRIEUCHUNG`, `TOANTHAN`, `TAICHUA`, `LOIDAN`, `TIENLUONG`, `NGAYKHAM`, `TRANGTHAIXOA`) VALUES
('BA001', 'TD001', 'Tăng huyết áp nguyên phát giai đoạn 2 - Rối loạn lipid máu', 'Mệt mỏi, tức ngực trái từng cơn', NULL, NULL, 'Ăn giảm muối, hạn chế dầu mỡ, tái khám sau 14 ngày', NULL, '2026-09-18', 0),
('BA002', 'TD002', 'Viêm loét dạ dày - tá tràng cấp kèm trào ngược thực quản', 'Ợ chua, đau quặn thượng vị sau khi ăn', NULL, NULL, 'Uống thuốc đúng bữa, không thức khuya, kiêng cay nóng', NULL, '2026-09-18', 0),
('BA003', 'TD003', 'CSAVDSBFD', 'savd', 'SVADSF', 'CSVADSBF', 'SVADSBFD', 'SVDASBFD', '2026-10-07', 0),
('BA004', 'TD004', 'sadbsf', 'sac', 'dsbf', 'vdabsfnd', 'svadbsfn', 'sànd', '2026-10-07', 0),
('BA005', 'TD005', 'ávsavsa', 'avsva', 'ávasvsa', 'ávsav', 'avsbasvsav', 'ávasvasv', '2026-10-07', 0),
('BA006', 'TD006', 'svadsbfd', 'scavdsbfd', 'savdbsfd', 'savdbfsdng', 'svafdngfh', 'svadsbfdngmf', '2026-10-08', 0),
('BA007', 'TD007', 'svadsbf', 'svadbfdngf', 'csavdsbfd', 'svadsbfd', 'Acsvafdngf', 'sVADSBFDN', '2026-10-08', 0),
('BA008', 'TD008', 'mnbhjbsac', 'đau bụng nhiều, không chịu đi ỉa', 'savds', 'scavds', 'SADFSBD', 'hết cứu', '2026-10-09', 0),
('BA009', 'TD009', 'sdasfb', 'savdfsb', 'avdsbf', 'savdsbf', 'dsbf', 'sdfsb', '2026-10-14', 0),
('BA010', 'TD010', 'savdsfbd', 'xscavds', 'csavdsf', 'csavdfbd', 'svadsfbdgn', 'vdsbfdngf', '2026-10-18', 0),
('BA011', 'TD011', 'svadsbf', 'scad', 'csavd', 'svds', 'vadfsbd', 'svdsbf', '2026-10-18', 0),
('BA012', 'TD012', 'sdsb', 'ádsbsavdsbf', 'dvs', 'dsb', 'sdasb', 'vsbf', '2026-10-21', 0),
('BA013', 'TD013', 'zxcvbn', 'zxcvbn', NULL, NULL, 'zxcvbn', NULL, '2026-10-25', 0),
('BA014', 'TD015', 'sdb', 'savds', 'svd', 'svds', 'svds', 'svads', '2026-10-25', 0),
('BA015', 'TD016', 'svad', 'scad', 'savds', 'svads', 'sadbs', 'svdabs', '2026-10-25', 0);

-- --------------------------------------------------------

--
-- Table structure for table `benhnhan`
--

CREATE TABLE `benhnhan` (
  `MABENHNHAN` varchar(20) NOT NULL,
  `MANGUOIDUNG` varchar(20) DEFAULT NULL,
  `HOTEN` varchar(100) DEFAULT NULL,
  `SODIENTHOAI` varchar(15) DEFAULT NULL,
  `EMAIL` varchar(100) DEFAULT NULL,
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

INSERT INTO `benhnhan` (`MABENHNHAN`, `MANGUOIDUNG`, `HOTEN`, `SODIENTHOAI`, `EMAIL`, `NGAYSINH`, `GIOITINH`, `NHOMMAU`, `DIACHI`, `SOBHYT`, `TIEUSUBENHAN`, `TRANGTHAIXOA`) VALUES
('BN001', 'ND007', 'Nguyễn Văn An', '0912345678', 'an.nguyen@gmail.com', '1988-05-12', 'Nam', 'O+', '123 Nguyễn Trãi, Quận 5, TP.HCM', 'DN4791234567890', 'Tăng huyết áp 2 năm, không dị ứng thuốc', 0),
('BN002', 'ND008', NULL, NULL, NULL, '1995-10-24', 'Nữ', 'A+', '456 Hai Bà Trưng, Quận 1, TP.HCM', 'DN4799876543210', 'Viêm loét dạ dày tái phát, dị ứng Penicillin', 0),
('BN003', 'ND009', NULL, NULL, NULL, '2018-03-15', 'Nam', 'B+', '789 Lê Văn Việt, TP. Thủ Đức, TP.HCM', NULL, 'Chưa ghi nhận bệnh mãn tính', 0),
('BN004', NULL, 'Huy', '0817665772', NULL, '2026-09-02', 'Nam', NULL, 'savds', NULL, NULL, 0),
('BN005', NULL, 'Khánh Cu', '0826943682', NULL, '2026-09-02', 'Nam', NULL, 'Phước Hải', NULL, NULL, 0),
('BN006', NULL, 'Huy Bảo', '0986726252', NULL, '2026-09-11', 'Nam', NULL, 'Long An', NULL, NULL, 0),
('BN007', 'ND00010', NULL, NULL, NULL, '2026-10-06', 'Nam', NULL, NULL, NULL, NULL, 0),
('BN008', 'ND00011', NULL, NULL, NULL, '2005-09-02', 'Nam', NULL, NULL, NULL, NULL, 0);

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
('CD_TD005_1', 'BA005', 'DV_NSDD', 1, 900000.00, 'DaChiDinh', NULL, NULL, '2026-10-07 02:28:10', NULL, 0),
('CD_TD006_1', 'BA006', 'DV_ECG', 1, 100000.00, 'DaChiDinh', NULL, NULL, '2026-10-08 02:33:51', NULL, 0),
('CD_TD007_1', 'BA007', 'DV_ECG', 1, 100000.00, 'DaChiDinh', NULL, NULL, '2026-10-08 02:40:16', NULL, 0),
('CD_TD008_1', 'BA008', 'DV_NSDD', 1, 900000.00, 'DaChiDinh', NULL, NULL, '2026-10-09 01:08:33', NULL, 0),
('CD_TD009_1', 'BA009', 'DV_ECG', 1, 100000.00, 'DaChiDinh', NULL, NULL, '2026-10-14 00:47:58', NULL, 0),
('CD_TD010_1', 'BA010', 'DV_ECHO', 1, 350000.00, 'DaChiDinh', NULL, NULL, '2026-10-18 10:22:22', NULL, 0),
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
('CTDT_TD005_1', 'DT003', 'TH001', 1, 10500.00, '', 10500.00, 0),
('CTDT_TD006_1', 'DT004', 'TH001', 4, 10500.00, '', 42000.00, 0),
('CTDT_TD007_1', 'DT005', 'TH002', 1, 22000.00, '', 22000.00, 0),
('CTDT_TD008_1', 'DT006', 'TH002', 1, 22000.00, '', 22000.00, 0),
('CTDT_TD009_1', 'DT007', 'TH002', 1, 22000.00, '', 22000.00, 0),
('CTDT_TD009_2', 'DT007', 'TH001', 1, 10500.00, '', 10500.00, 0),
('CTDT_TD010_1', 'DT008', 'TH002', 11, 22000.00, '', 242000.00, 0),
('CTDT_TD010_2', 'DT008', 'TH004', 9, 2500.00, '', 22500.00, 0),
('CTDT_TD011_1', 'DT009', 'TH004', 1, 2500.00, '', 2500.00, 0),
('CTDT_TD012_1', 'DT010', 'TH004', 1, 2500.00, '', 2500.00, 0),
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
('CTHD007', 'HD002', 'Thuoc', 'DT002', 'Tiền đơn thuốc điều trị ngoại trú', 1, 722000.00, 722000.00, 'Tổng tiền thuốc theo đơn DT002', 0),
('CTHD008', 'HD003', 'PhiKham', 'BS001', 'Công khám Bác sĩ Chuyên khoa II BS.CKII Trần Văn Nam', 1, 250000.00, 250000.00, 'Tiền khám theo bác sĩ', 0),
('CTHD009', 'HD004', 'PhiKham', 'BS003', 'Công khám Bác sĩ Đa khoa BS Phạm Minh Đức', 1, 150000.00, 150000.00, 'Tiền khám theo bác sĩ', 0),
('CTHD010', 'HD004', 'DichVu', 'DV_NSDD', 'Nội soi dạ dày gây mê', 1, 900000.00, 900000.00, 'Chỉ định CD_TD005_1', 0),
('CTHD011', 'HD004', 'Thuoc', 'DT003', 'Tiền đơn thuốc điều trị ngoại trú', 1, 10500.00, 10500.00, 'Tổng tiền thuốc theo khoản DT003', 0),
('CTHD012', 'HD005', 'PhiKham', 'BS002', 'Công khám Thạc sĩ Bác sĩ ThS.BS Lê Thị Lan', 1, 180000.00, 180000.00, 'Tiền khám theo bác sĩ', 0),
('CTHD013', 'HD005', 'DichVu', 'DV_ECHO', 'Siêu âm tim màu Doppler', 1, 350000.00, 350000.00, 'Chỉ định CD_TD010_1', 0),
('CTHD014', 'HD005', 'Thuoc', 'DT008', 'Tiền đơn thuốc điều trị ngoại trú', 1, 264500.00, 264500.00, 'Tổng tiền thuốc theo khoản DT008', 0),
('CTHD015', 'HD006', 'PhiKham', 'BS001', 'Công khám Bác sĩ Chuyên khoa II BS.CKII Trần Văn Nam', 1, 0.00, 0.00, 'Tiền khám theo bác sĩ', 0),
('CTHD016', 'HD006', 'Thuoc', 'DT009', 'Tiền đơn thuốc điều trị ngoại trú', 1, 2500.00, 2500.00, 'Tổng tiền thuốc theo khoản DT009', 0),
('CTHD017', 'HD007', 'PhiKham', 'BS001', 'Công khám Bác sĩ Chuyên khoa II BS.CKII Trần Văn Nam', 1, 0.00, 0.00, 'Tiền khám theo bác sĩ', 0),
('CTHD018', 'HD007', 'Thuoc', 'DT010', 'Tiền đơn thuốc điều trị ngoại trú', 1, 2500.00, 2500.00, 'Tổng tiền thuốc theo khoản DT010', 0),
('CTHD019', 'HD008', 'PhiKham', 'BS001', 'Công khám Bác sĩ Chuyên khoa II BS.CKII Trần Văn Nam', 1, 0.00, 0.00, 'Tiền khám theo bác sĩ', 0),
('CTHD020', 'HD009', 'PhiKham', 'BS002', 'Công khám Thạc sĩ Bác sĩ ThS.BS Lê Thị Lan', 1, 0.00, 0.00, 'Tiền khám theo bác sĩ', 0);

-- --------------------------------------------------------

--
-- Table structure for table `chuyenkhoa`
--

CREATE TABLE `chuyenkhoa` (
  `MACHUYENKHOA` varchar(20) NOT NULL,
  `TENCHUYENKHOA` varchar(100) NOT NULL,
  `MOTA` text DEFAULT NULL,
  `PHIKHAMCHUAN` decimal(12,2) DEFAULT 0.00,
  `TRANGTHAI` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0,
  `NGAYTAO` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chuyenkhoa`
--

INSERT INTO `chuyenkhoa` (`MACHUYENKHOA`, `TENCHUYENKHOA`, `MOTA`, `PHIKHAMCHUAN`, `TRANGTHAI`, `TRANGTHAIXOA`, `NGAYTAO`) VALUES
('CK_NHI', 'Khoa Nhi', 'Khám và chăm sóc sức khỏe toàn diện cho trẻ em', 150000.00, 'INACTIVE', 0, '2026-09-18 01:33:16'),
('CK_NOI', 'Khoa Nội Tổng Quát', 'Khám, chẩn đoán và điều trị bệnh nội khoa người lớn', 150000.00, 'INACTIVE', 0, '2026-09-18 01:33:16'),
('CK_TAI', 'Khoa Tai Mũi Họng', 'Khám và nội soi điều trị các bệnh lý tai mũi họng', 180000.00, 'INACTIVE', 0, '2026-09-18 01:33:16'),
('CK_TIM', 'Khoa Tim Mạch', 'Chẩn đoán và điều trị bệnh lý tim mạch, huyết áp', 200000.00, 'INACTIVE', 0, '2026-09-18 01:33:16');

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
('DT002', 'BA002', '2026-09-18', 'Kiên trì dùng đủ đợt điều trị kháng tiết axit', 0),
('DT003', 'BA005', '2026-10-07', 'avsbasvsav', 0),
('DT004', 'BA006', '2026-10-08', 'svafdngfh', 0),
('DT005', 'BA007', '2026-10-08', 'Acsvafdngf', 0),
('DT006', 'BA008', '2026-10-09', 'SADFSBD', 0),
('DT007', 'BA009', '2026-10-14', 'dsbf', 0),
('DT008', 'BA010', '2026-10-18', 'svadsfbdgn', 0),
('DT009', 'BA011', '2026-10-18', 'vadfsbd', 0),
('DT010', 'BA012', '2026-10-21', 'sdasb', 0);

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
('HD002', 'BA002', 'NV002', 1352000.00, 0.00, 1352000.00, 'ChuyenKhoan', 'DaThanhToan', '2026-09-18 03:15:00', '2026-09-18 01:33:17', 0),
('HD003', 'BA003', 'NV002', 300000.00, 50000.00, 250000.00, 'TienMat', 'DaThanhToan', '2026-10-09 01:39:45', '2026-10-09 01:39:30', 0),
('HD004', 'BA005', 'NV002', 0.00, 0.00, 1060500.00, NULL, 'ChuaThanhToan', NULL, '2026-10-09 01:41:43', 0),
('HD005', 'BA010', 'NV001', 794500.00, 0.00, 794500.00, 'ChuyenKhoan', 'DaThanhToan', '2026-10-18 10:25:15', '2026-10-18 10:22:22', 0),
('HD006', 'BA011', 'NV001', 0.00, 0.00, 2500.00, NULL, 'ChuaThanhToan', NULL, '2026-10-18 10:35:31', 0),
('HD007', 'BA012', 'NV001', 0.00, 0.00, 2500.00, NULL, 'ChuaThanhToan', NULL, '2026-10-21 10:49:21', 0),
('HD008', 'BA014', 'NV001', 0.00, 0.00, 0.00, NULL, 'ChuaThanhToan', NULL, '2026-10-25 14:12:20', 0),
('HD009', 'BA015', 'NV001', 0.00, 0.00, 0.00, NULL, 'ChuaThanhToan', NULL, '2026-10-25 14:20:45', 0);

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
('LH001', 'BN001', 'BS001', 'LT001', '2026-09-18', '08:00:00', 'Đau thắt ngực khi gắng sức, chóng mặt', '2026-09-18 01:33:16', 'HoanTat', 0),
('LH002', 'BN002', 'BS002', 'LT002', '2026-09-18', '08:30:00', 'Đau rát vùng thượng vị nhiều ngày qua', '2026-09-18 01:33:16', 'DaDen', 0),
('LH003', 'BN003', 'BS003', 'LT003', '2026-09-18', '14:00:00', 'Sốt cao, ho có đờm', '2026-09-18 01:33:16', 'HoanTat', 0),
('LH005', 'BN001', 'BS003', 'LT004', '2026-10-10', '07:30:00', 'scavdsbfd', '2026-10-10 06:40:10', 'DaDat', 0),
('LH006', 'BN004', 'BS003', 'LT004', '2026-10-10', '07:30:00', 'csavdsbf', '2026-10-10 06:40:39', 'DaDat', 0),
('LH007', 'BN002', 'BS003', 'LT004', '2026-10-10', '07:30:00', 'scavds', '2026-10-10 12:35:47', 'DaDat', 0),
('LH008', 'BN003', 'BS003', 'LT004', '2026-10-10', '07:30:00', 'scavds', '2026-10-10 12:43:38', 'DaDat', 0),
('LH009', 'BN001', 'BS002', 'LT005', '2026-10-14', '07:30:00', 'scavdsb', '2026-10-14 00:41:12', 'HoanTat', 0),
('LH010', 'BN001', 'BS002', 'LT006', '2026-10-16', '07:30:00', 'svdsfd', '2026-10-16 00:53:46', 'DaDat', 0),
('LH011', 'BN007', 'BS002', 'LT007', '2026-10-18', '07:30:00', 'savdsbf', '2026-10-18 10:20:52', 'HoanTat', 0),
('LH012', 'BN007', 'BS001', 'LT008', '2026-10-18', '07:30:00', 'svdsfbd', '2026-10-18 10:34:33', 'HoanTat', 0),
('LH013', 'BN001', 'BS001', 'LT009', '2026-10-21', '07:30:00', 'sdafsd', '2026-10-21 03:45:05', 'HoanTat', 0),
('LH014', 'BN008', 'BS002', 'LT010', '2026-10-25', '07:30:00', 'Abc', '2026-10-25 07:28:35', 'HoanTat', 0),
('LH015', 'BN007', 'BS001', 'LT011', '2026-10-25', '07:30:00', 'fadsfbg', '2026-10-25 11:57:34', 'DaHuy', 0),
('LH016', 'BN007', 'BS001', 'LT011', '2026-10-25', '07:30:00', 'fegwr', '2026-10-25 13:50:30', 'HoanTat', 0),
('LH017', 'BN007', 'BS002', 'LT010', '2026-10-25', '07:30:00', 'Khám bệnh theo yêu cầu', '2026-10-25 14:15:12', 'HoanTat', 0),
('LH018', 'BN007', 'BS002', 'LT012', '2026-10-25', '07:30:00', 'Khám bệnh theo yêu cầu', '2026-10-25 14:28:36', 'DaDen', 0);

-- --------------------------------------------------------

--
-- Table structure for table `lichsucheckin`
--

CREATE TABLE `lichsucheckin` (
  `MALICHSU` varchar(20) NOT NULL,
  `MALICHHEN` varchar(20) NOT NULL,
  `MABENHNHAN` varchar(20) DEFAULT NULL,
  `MATIEPDON` varchar(20) DEFAULT NULL,
  `MANHANVIEN` varchar(20) DEFAULT NULL,
  `PHUONGTHUC` varchar(20) NOT NULL DEFAULT 'QR',
  `KETQUA` varchar(30) NOT NULL,
  `GHICHU` varchar(255) DEFAULT NULL,
  `THOIGIANQUET` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lichsucheckin`
--

INSERT INTO `lichsucheckin` (`MALICHSU`, `MALICHHEN`, `MABENHNHAN`, `MATIEPDON`, `MANHANVIEN`, `PHUONGTHUC`, `KETQUA`, `GHICHU`, `THOIGIANQUET`) VALUES
('LS0001', 'LH006', 'BN004', NULL, 'NV001', 'QR', 'ThanhCong', NULL, '2026-10-10 13:57:59'),
('LS0002', 'LH006', 'BN004', NULL, 'NV001', 'QR', 'ThanhCong', NULL, '2026-10-10 13:59:11'),
('LS0003', 'LH006', 'BN004', NULL, 'NV001', 'QR', 'ThanhCong', NULL, '2026-10-10 20:16:18'),
('LS0004', 'LH009', 'BN001', 'TD009', 'NV001', 'QR', 'ThanhCong', NULL, '2026-10-14 07:41:54'),
('LS0005', 'LH009', 'BN001', NULL, 'NV001', 'QR', 'DaCheckIn', 'Lịch hẹn đã được tiếp đón trước đó', '2026-10-16 07:49:03'),
('LS0006', 'LH009', 'BN001', NULL, 'NV001', 'QR', 'DaCheckIn', 'Lịch hẹn đã được tiếp đón trước đó', '2026-10-16 07:49:16'),
('LS0007', 'LH009', 'BN001', NULL, 'NV001', 'QR', 'DaCheckIn', 'Lịch hẹn đã được tiếp đón trước đó', '2026-10-16 13:31:54'),
('LS0008', 'LH011', 'BN007', 'TD010', 'NV001', 'QR', 'ThanhCong', NULL, '2026-10-18 17:21:27'),
('LS0009', 'LH012', 'BN007', 'TD011', 'NV001', 'MANUAL', 'ThanhCong', NULL, '2026-10-18 17:34:53'),
('LS0010', 'LH013', 'BN001', 'TD012', 'NV001', 'QR', 'ThanhCong', NULL, '2026-10-21 10:45:39'),
('LS0011', 'LH013', 'BN001', 'TD012', 'NV001', 'QR', 'ThanhCong', NULL, '2026-10-21 17:36:16'),
('LS0012', 'LH014', 'BN008', 'TD013', 'NV001', 'QR', 'ThanhCong', NULL, '2026-10-25 14:28:55'),
('LS0013', 'LH001', 'BN001', NULL, 'NV001', 'MANUAL', 'ThanhCong', NULL, '2026-10-25 18:10:51'),
('LS0014', 'LH002', 'BN002', 'TD014', 'NV001', 'MANUAL', 'ThanhCong', NULL, '2026-10-25 18:10:57'),
('LS0015', 'LH001', 'BN001', NULL, 'NV001', 'QR', 'DaKham', 'Lịch hẹn LH001 đã hoàn tất khám bệnh, không thể tiếp đón lại.', '2026-10-25 18:28:02'),
('LS0016', 'LH002', 'BN002', NULL, 'NV001', 'QR', 'DaKham', 'Lịch hẹn LH002 đã hoàn tất khám bệnh, không thể tiếp đón lại.', '2026-10-25 18:28:02'),
('LS0017', 'LH005', 'BN001', NULL, 'NV001', 'QR', 'ThanhCong', NULL, '2026-10-25 18:28:02'),
('LS0018', 'LH001', 'BN001', NULL, 'NV001', 'QR', 'DaKham', 'Lịch hẹn LH001 đã hoàn tất khám bệnh, không thể tiếp đón lại.', '2026-10-25 18:30:33'),
('LS0019', 'LH002', 'BN002', NULL, 'NV001', 'QR', 'DaCheckIn', 'Lịch hẹn LH002 đã được tiếp đón và đang trong hàng đợi (STT: 2, Phòng: PK101). Không thể tiếp đón lại.', '2026-10-25 18:30:33'),
('LS0020', 'LH005', 'BN001', NULL, 'NV001', 'QR', 'ThanhCong', NULL, '2026-10-25 18:30:33'),
('LS0021', 'LH001', 'BN001', NULL, 'NV001', 'MANUAL', 'DaKham', 'Lịch hẹn LH001 đã hoàn tất khám bệnh, không thể tiếp đón lại.', '2026-10-25 18:38:38'),
('LS0022', 'LH016', 'BN007', 'TD015', 'NV001', 'QR', 'ThanhCong', NULL, '2026-10-25 20:53:23'),
('LS0023', 'LH016', 'BN007', NULL, 'NV001', 'QR', 'DaCheckIn', 'Lịch hẹn LH016 đã được tiếp đón và đang trong hàng đợi (STT: 1, Phòng: PK102). Không thể tiếp đón lại.', '2026-10-25 20:53:41'),
('LS0024', 'LH017', 'BN007', 'TD016', 'NV001', 'QR', 'ThanhCong', NULL, '2026-10-25 21:15:57'),
('LS0025', 'LH018', 'BN007', 'TD017', 'NV001', 'QR', 'ThanhCong', NULL, '2026-10-25 21:29:03');

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
('LT003', 'BS003', 'PK201', '2026-09-18', '13:30:00', '17:00:00', 20, 'MoDangKy', 0),
('LT004', 'BS003', 'PK201', '2026-10-10', '07:30:00', '11:30:00', 30, 'MoDangKy', 0),
('LT005', 'BS002', 'PK101', '2026-10-14', '07:30:00', '11:30:00', 30, 'MoDangKy', 0),
('LT006', 'BS002', 'PK101', '2026-10-16', '07:30:00', '11:30:00', 30, 'MoDangKy', 0),
('LT007', 'BS002', 'PK101', '2026-10-18', '07:30:00', '11:30:00', 30, 'MoDangKy', 0),
('LT008', 'BS001', 'PK102', '2026-10-18', '07:30:00', '11:30:00', 30, 'MoDangKy', 0),
('LT009', 'BS001', 'PK102', '2026-10-21', '07:30:00', '11:30:00', 30, 'MoDangKy', 0),
('LT010', 'BS002', 'PK101', '2026-10-25', '07:30:00', '11:30:00', 30, 'MoDangKy', 0),
('LT011', 'BS001', 'PK102', '2026-10-25', '07:30:00', '11:30:00', 30, 'MoDangKy', 0),
('LT012', 'BS002', 'PK101', '2026-10-25', '07:30:00', '11:30:00', 30, 'MoDangKy', 0);

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
  `VAITRO` enum('ADMIN','DEV','DOCTOR','PATIENT','STAFF') NOT NULL DEFAULT 'PATIENT',
  `TRANGTHAI` enum('ACTIVE','LOCKED') NOT NULL DEFAULT 'ACTIVE',
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0,
  `NGAYTAO` timestamp NOT NULL DEFAULT current_timestamp(),
  `NGAYCAPNHAT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `GOOGLE_ID` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `nguoidung`
--

INSERT INTO `nguoidung` (`MANGUOIDUNG`, `TENDANGNHAP`, `MATKHAU`, `HOTEN`, `EMAIL`, `SODIENTHOAI`, `VAITRO`, `TRANGTHAI`, `TRANGTHAIXOA`, `NGAYTAO`, `NGAYCAPNHAT`, `GOOGLE_ID`) VALUES
('ND00010', '0816808776', '$2a$10$f66i7udTOc4GVPQfEC3kXOig0Q21gm7G4zOYkqyAnjQyeVHZLj8yS', 'Gia Huy Võ', 'giahuya6k5@gmail.com', '0816808776', 'PATIENT', 'ACTIVE', 0, '2026-10-16 00:41:49', '2026-10-25 05:25:20', NULL),
('ND00011', '0886121849', '$2a$10$GE2fn6xNtKvoF20K0Ol84.qztAyQZh4l1orDu/4XoCdAHooMkugby', 'Tăng Huỳnh Quốc Khánh', 'quockhanhtanghuynh@gmail.com', '0886121849', 'PATIENT', 'ACTIVE', 0, '2026-10-25 03:47:39', '2026-10-25 03:47:39', '103289369891999916708'),
('ND001', 'admin', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'Nguyễn Quản Trị', 'admin@clinic.vn', '0901000001', 'ADMIN', 'ACTIVE', 0, '2026-09-18 01:33:16', '2026-10-22 02:24:21', NULL),
('ND002', 'dr_nam', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'BS.CKII Trần Văn Nam', 'nam.tv@clinic.vn', '0902000002', 'DOCTOR', 'ACTIVE', 0, '2026-09-18 01:33:16', '2026-10-22 02:24:39', NULL),
('ND003', 'dr_lan', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'ThS.BS Lê Thị Lan', 'lan.lt@clinic.vn', '0903000003', 'DOCTOR', 'ACTIVE', 0, '2026-09-18 01:33:16', '2026-10-25 10:56:05', NULL),
('ND004', 'dr_duc', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'BS Phạm Minh Đức', 'duc.pm@clinic.vn', '0904000004', 'DEV', 'ACTIVE', 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16', NULL),
('ND005', 'nv_mai', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'Hoàng Tuyết Mai', 'mai.ht@clinic.vn', '0905000005', 'STAFF', 'ACTIVE', 0, '2026-09-18 01:33:16', '2026-10-25 10:56:39', NULL),
('ND006', 'nv_hung', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'Vũ Quốc Hùng', 'hung.vq@clinic.vn', '0906000006', 'ADMIN', 'ACTIVE', 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16', NULL),
('ND007', 'bn_an', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'Nguyễn Văn An', 'an.nguyen@gmail.com', '0912345678', 'PATIENT', 'ACTIVE', 0, '2026-09-18 01:33:16', '2026-10-25 05:23:44', NULL),
('ND008', 'bn_binh', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'Trần Thị Bình', 'binh.tran@gmail.com', '0913456789', 'PATIENT', 'ACTIVE', 0, '2026-09-18 01:33:16', '2026-10-25 05:23:44', NULL),
('ND009', 'bn_cuong', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'Lê Hùng Cường', 'cuong.le@gmail.com', '0914567890', 'PATIENT', 'ACTIVE', 0, '2026-09-18 01:33:16', '2026-10-25 05:23:44', NULL),
('ND010', 'nv_staff', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'Nhân viên Lễ tân', 'staff@clinic.vn', '0905000010', 'STAFF', 'ACTIVE', 0, '2026-10-25 06:54:28', '2026-10-25 06:56:12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `nhanvien`
--

CREATE TABLE `nhanvien` (
  `MANHANVIEN` varchar(20) NOT NULL,
  `MANGUOIDUNG` varchar(20) NOT NULL,
  `VITRI` enum('cashier','receptionist') NOT NULL,
  `NGAYVAOLAM` date DEFAULT NULL,
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `nhanvien`
--

INSERT INTO `nhanvien` (`MANHANVIEN`, `MANGUOIDUNG`, `VITRI`, `NGAYVAOLAM`, `TRANGTHAIXOA`) VALUES
('NV001', 'ND005', 'receptionist', '2023-01-15', 0),
('NV002', 'ND006', 'cashier', '2023-03-01', 0),
('NV003', 'ND010', 'receptionist', '2026-01-05', 0);

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
  `TRANGTHAI` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `TRANGTHAIXOA` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `phongkham`
--

INSERT INTO `phongkham` (`MAPHONG`, `MACHUYENKHOA`, `SOPHONG`, `TENPHONG`, `TANG`, `TRANGTHAI`, `TRANGTHAIXOA`) VALUES
('PK101', 'CK_NOI', 'P.101', 'Phòng Khám Nội 1', 'Tầng 1', 'ACTIVE', 0),
('PK102', 'CK_TIM', 'P.102', 'Phòng Khám Tim Mạch', 'Tầng 1', 'ACTIVE', 0),
('PK201', 'CK_NHI', 'P.201', 'Phòng Khám Nhi Đồng', 'Tầng 2', 'ACTIVE', 0),
('PKCL01', 'CK_NOI', 'P.CL01', 'Phòng Xét Nghiệm - Siêu Âm', 'Tầng Trệt', 'ACTIVE', 0);

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
('TH001', 'Amlor 5mg', 'Amlodipine besylate', 'Viên', 10500.00, 1494, 'Uống 1 viên vào mỗi buổi sáng sau ăn', 0),
('TH002', 'Lipitor 20mg', 'Atorvastatin', 'Viên', 22000.00, 786, 'Uống 1 viên buổi tối trước khi đi ngủ', 0),
('TH003', 'Nexium 40mg', 'Esomeprazole', 'Viên', 24000.00, 1200, 'Uống 1 viên trước ăn sáng 30 phút', 0),
('TH004', 'Kremil-S', 'Aluminium hydroxide + Simethicone', 'Viên', 1000.00, 1989, 'Nhai 1 viên sau ăn khi xuất hiện đau rát hoặc ợ chua', 0),
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
  `TRIEUCHUNGBANDAU` text DEFAULT NULL,
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

INSERT INTO `tiepdonkham` (`MATIEPDON`, `MABENHNHAN`, `MANHANVIEN`, `MAPHONG`, `MABACSI`, `MALICHHEN`, `NGAYTIEPDON`, `SOTHUTU`, `LOAITIEPDON`, `TRANGTHAIHANGDOI`, `TRIEUCHUNGBANDAU`, `MACH`, `NHIETDO`, `HUYETAP`, `CANNANG`, `CHIEUCAO`, `XTHOIGIANTIEPDON`, `TRANGTHAIXOA`) VALUES
('TD001', 'BN001', 'NV001', 'PK102', 'BS001', 'LH001', '2026-10-02', 1, 'HenTruoc', 'DaKham', 'Đau tức ngực, hồi hộp khó thở nhẹ', 82, 36.8, '140/90', 68.50, 168.00, '2026-09-18 01:33:16', 0),
('TD002', 'BN002', 'NV001', 'PK101', 'BS002', 'LH002', '2026-09-18', 2, 'HenTruoc', 'DaKham', 'Đau vùng thượng vị âm ỉ, buồn nôn', 76, 37.0, '115/75', 52.00, 158.00, '2026-09-18 01:33:16', 0),
('TD003', 'BN001', 'NV001', 'PK102', 'BS001', 'LH001', '2026-10-07', 1, 'HenTruoc', 'DaKham', 'Đau thắt ngực khi gắng sức, chóng mặt', NULL, NULL, '', NULL, NULL, '2026-10-07 02:09:12', 0),
('TD004', 'BN003', 'NV001', 'PK201', 'BS003', 'LH003', '2026-10-07', 1, 'HenTruoc', 'DaKham', 'Sốt cao, ho có đờm', NULL, NULL, '', NULL, NULL, '2026-10-07 02:14:09', 0),
('TD005', 'BN004', 'NV001', 'PK201', 'BS003', NULL, '2026-10-07', 2, 'TrucTiep', 'DaKham', 'đau bụng', NULL, NULL, '', NULL, NULL, '2026-10-07 02:26:31', 0),
('TD006', 'BN002', 'NV001', 'PK101', 'BS002', 'lh002', '2026-10-08', 1, 'HenTruoc', 'DaKham', 'Đau rát vùng thượng vị nhiều ngày qua', NULL, NULL, '', NULL, NULL, '2026-10-08 02:20:38', 0),
('TD007', 'BN005', 'NV001', 'PK101', 'BS002', NULL, '2026-10-08', 2, 'TrucTiep', 'DaKham', 'àdsf', NULL, NULL, '', NULL, NULL, '2026-10-08 02:39:33', 0),
('TD008', 'BN006', 'NV001', 'PKCL01', 'BS002', NULL, '2026-10-09', 1, 'TrucTiep', 'DaKham', 'đau bụng', NULL, NULL, '', NULL, NULL, '2026-10-09 01:06:57', 0),
('TD009', 'BN001', 'NV001', 'PK101', 'BS002', 'LH009', '2026-10-14', 1, 'HenTruoc', 'DaKham', 'scavdsb', NULL, NULL, '', NULL, NULL, '2026-10-14 00:41:59', 0),
('TD010', 'BN007', 'NV001', 'PK101', 'BS002', 'LH011', '2026-10-18', 1, 'HenTruoc', 'DaKham', 'savdsbf', NULL, NULL, '', NULL, NULL, '2026-10-18 10:21:41', 0),
('TD011', 'BN007', 'NV001', 'PK102', 'BS001', 'LH012', '2026-10-18', 1, 'HenTruoc', 'DaKham', 'svdsfbd', NULL, NULL, '', NULL, NULL, '2026-10-18 10:34:55', 0),
('TD012', 'BN001', 'NV001', 'PK102', 'BS001', 'LH013', '2026-10-21', 1, 'HenTruoc', 'DaKham', 'sdafsd', NULL, NULL, '', NULL, NULL, '2026-10-21 10:36:21', 0),
('TD013', 'BN008', 'NV001', 'PK101', 'BS002', 'LH014', '2026-10-25', 1, 'HenTruoc', 'DaKham', 'Abc', NULL, NULL, '', NULL, NULL, '2026-10-25 07:29:07', 0),
('TD014', 'BN002', 'NV001', 'PK101', 'BS002', 'LH002', '2026-10-25', 2, 'HenTruoc', 'ChoKham', 'Đau rát vùng thượng vị nhiều ngày qua', NULL, NULL, '', NULL, NULL, '2026-10-25 11:11:36', 0),
('TD015', 'BN007', 'NV001', 'PK102', 'BS001', 'LH016', '2026-10-25', 1, 'HenTruoc', 'DaKham', 'fegwr', NULL, NULL, '', NULL, NULL, '2026-10-25 13:53:31', 0),
('TD016', 'BN007', 'NV001', 'PK101', 'BS002', 'LH017', '2026-10-25', 3, 'HenTruoc', 'DaKham', 'Khám bệnh theo yêu cầu', NULL, NULL, '', NULL, NULL, '2026-10-25 14:16:18', 0),
('TD017', 'BN007', 'NV001', 'PK101', 'BS002', 'LH018', '2026-10-25', 4, 'HenTruoc', 'ChoKham', 'Khám bệnh theo yêu cầu', NULL, NULL, '', NULL, NULL, '2026-10-25 14:29:08', 0);

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
-- Indexes for table `lichsucheckin`
--
ALTER TABLE `lichsucheckin`
  ADD PRIMARY KEY (`MALICHSU`),
  ADD KEY `idx_lichsucheckin_lichhen` (`MALICHHEN`),
  ADD KEY `idx_lichsucheckin_thoigian` (`THOIGIANQUET`);

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
  ADD UNIQUE KEY `EMAIL` (`EMAIL`),
  ADD UNIQUE KEY `GOOGLE_ID` (`GOOGLE_ID`);

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
