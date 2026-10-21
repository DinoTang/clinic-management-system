INSERT INTO `bacsi` (`MABACSI`, `MANGUOIDUNG`, `MACHUYENKHOA`, `HOCVI`, `NAMKINHNGHIEM`, `TIEUSU`, `PHIKHAM`, `TRANGTHAIXOA`) VALUES
('BS001', 'ND002', 'CK_TIM', 'Bác sĩ Chuyên khoa II', 15, 'Từng công tác tại BV Chợ Rẫy, chuyên sâu can thiệp tim mạch', 250000.00, 0),
('BS002', 'ND003', 'CK_NOI', 'Thạc sĩ Bác sĩ', 8, 'Tốt nghiệp ĐH Y Dược TP.HCM, chuyên khoa Nội tiêu hóa', 180000.00, 0),
('BS003', 'ND004', 'CK_NHI', 'Bác sĩ Đa khoa', 5, 'Kinh nghiệm 5 năm điều trị nhi khoa tổng quát', 150000.00, 0);

INSERT INTO `benhan` (`MABENHAN`, `MATIEPDON`, `CHUANDOAN`, `TRIEUCHUNG`, `LOIDAN`, `NGAYKHAM`, `TRANGTHAIXOA`) VALUES
('BA001', 'TD001', 'Tăng huyết áp nguyên phát giai đoạn 2 - Rối loạn lipid máu', 'Mệt mỏi, tức ngực trái từng cơn', 'Ăn giảm muối, hạn chế dầu mỡ, tái khám sau 14 ngày', '2026-09-18', 0),
('BA002', 'TD002', 'Viêm loét dạ dày - tá tràng cấp kèm trào ngược thực quản', 'Ợ chua, đau quặn thượng vị sau khi ăn', 'Uống thuốc đúng bữa, không thức khuya, kiêng cay nóng', '2026-09-18', 0);

INSERT INTO `benhnhan` (`MABENHNHAN`, `MANGUOIDUNG`, `NGAYSINH`, `GIOITINH`, `NHOMMAU`, `DIACHI`, `SOBHYT`, `TIEUSUBENHAN`, `TRANGTHAIXOA`) VALUES
('BN001', 'ND007', '1988-05-12', 'Nam', 'O+', '123 Nguyễn Trãi, Quận 5, TP.HCM', 'DN4791234567890', 'Tăng huyết áp 2 năm, không dị ứng thuốc', 0),
('BN002', 'ND008', '1995-10-24', 'Nữ', 'A+', '456 Hai Bà Trưng, Quận 1, TP.HCM', 'DN4799876543210', 'Viêm loét dạ dày tái phát, dị ứng Penicillin', 0),
('BN003', 'ND009', '2018-03-15', 'Nam', 'B+', '789 Lê Văn Việt, TP. Thủ Đức, TP.HCM', NULL, 'Chưa ghi nhận bệnh mãn tính', 0);

INSERT INTO `chidinhdichvu` (`MACHIDINH`, `MABENHAN`, `MADICHVU`, `SOLUONG`, `DONGIA`, `TRANGTHAI`, `KETQUA`, `FILEKETQUA`, `THOIGIANCHIDINH`, `THOIGIANKETQUA`, `TRANGTHAIXOA`) VALUES
('CD001', 'BA001', 'DV_ECG', 1, 100000.00, 'HoanThanh', 'Nhịp xoang đều, phì đại thất trái nhẹ', '/uploads/results/ecg_ba001.pdf', '2026-09-18 01:15:00', '2026-09-18 01:45:00', 0),
('CD002', 'BA001', 'DV_ECHO', 1, 350000.00, 'HoanThanh', 'Chức năng tâm thu thất trái bảo tồn (EF = 62%), hở van 2 lá nhẹ 1/4', '/uploads/results/echo_ba001.pdf', '2026-09-18 01:15:00', '2026-09-18 02:10:00', 0),
('CD003', 'BA002', 'DV_XNBL', 1, 450000.00, 'HoanThanh', 'HP dương tính (Positive +++)', '/uploads/results/hp_ba002.pdf', '2026-09-18 01:50:00', '2026-09-18 02:25:00', 0);

INSERT INTO `chitietdonthuoc` (`MACHITIETDONTHUOC`, `MADONTHUOC`, `MATHUOC`, `SOLUONG`, `DONGIA`, `LIEUDUNG`, `THANHTIEN`, `TRANGTHAIXOA`) VALUES
('CTDT001', 'DT001', 'TH001', 28, 10500.00, '1 viên/ngày (sáng)', 294000.00, 0),
('CTDT002', 'DT001', 'TH002', 14, 22000.00, '1 viên/ngày (tối)', 308000.00, 0),
('CTDT003', 'DT002', 'TH003', 28, 24000.00, '1 viên/ngày (sáng)', 672000.00, 0),
('CTDT004', 'DT002', 'TH004', 20, 2500.00, 'Nhai khi đau rát', 50000.00, 0);

INSERT INTO `chitiethoadon` (`MACHITIETHOADON`, `MAHOADON`, `LOAIMUCTHU`, `MAMUCTHU`, `TENMUCTHU`, `SOLUONG`, `DONGIA`, `THANHTIEN`, `GHICHU`, `TRANGTHAIXOA`) VALUES
('CTHD001', 'HD001', 'PhiKham', 'BS001', 'Công khám Bác sĩ CKII Tim mạch', 1, 250000.00, 250000.00, 'Tiền khám theo bác sĩ', 0),
('CTHD002', 'HD001', 'DichVu', 'DV_ECG', 'Điện tâm đồ (ECG 12 chuyển đạo)', 1, 100000.00, 100000.00, 'Chỉ định CD001', 0),
('CTHD003', 'HD001', 'DichVu', 'DV_ECHO', 'Siêu âm tim màu Doppler', 1, 350000.00, 350000.00, 'Chỉ định CD002', 0),
('CTHD004', 'HD001', 'Thuoc', 'DT001', 'Tiền đơn thuốc điều trị ngoại trú', 1, 602000.00, 602000.00, 'Tổng tiền thuốc theo đơn DT001', 0),
('CTHD005', 'HD002', 'PhiKham', 'BS002', 'Công khám Thạc sĩ BS Nội tổng quát', 1, 180000.00, 180000.00, 'Tiền khám theo bác sĩ', 0),
('CTHD006', 'HD002', 'DichVu', 'DV_XNBL', 'Xét nghiệm vi khuẩn HP qua hơi thở', 1, 450000.00, 450000.00, 'Chỉ định CD003', 0),
('CTHD007', 'HD002', 'Thuoc', 'DT002', 'Tiền đơn thuốc điều trị ngoại trú', 1, 722000.00, 722000.00, 'Tổng tiền thuốc theo đơn DT002', 0);

INSERT INTO `chuyenkhoa` (`MACHUYENKHOA`, `TENCHUYENKHOA`, `MOTA`, `PHIKHAMCHUAN`, `TRANGTHAI`, `TRANGTHAIXOA`, `NGAYTAO`) VALUES
('CK_NHI', 'Khoa Nhi', 'Khám và chăm sóc sức khỏe toàn diện cho trẻ em', 150000.00, 1, 0, '2026-09-18 01:33:16'),
('CK_NOI', 'Khoa Nội Tổng Quát', 'Khám, chẩn đoán và điều trị bệnh nội khoa người lớn', 150000.00, 1, 0, '2026-09-18 01:33:16'),
('CK_TAI', 'Khoa Tai Mũi Họng', 'Khám và nội soi điều trị các bệnh lý tai mũi họng', 180000.00, 1, 0, '2026-09-18 01:33:16'),
('CK_TIM', 'Khoa Tim Mạch', 'Chẩn đoán và điều trị bệnh lý tim mạch, huyết áp', 200000.00, 1, 0, '2026-09-18 01:33:16');

INSERT INTO `dichvu` (`MADICHVU`, `MACHUYENKHOA`, `TENDICHVU`, `DONGIA`, `DONVITINH`, `MOTA`, `TRANGTHAI`, `TRANGTHAIXOA`) VALUES
('DV_ECG', 'CK_TIM', 'Điện tâm đồ (ECG 12 chuyển đạo)', 100000.00, 'Lần', 'Ghi hoạt động điện của tim phát hiện rối loạn nhịp', 1, 0),
('DV_ECHO', 'CK_TIM', 'Siêu âm tim màu Doppler', 350000.00, 'Lần', 'Đánh giá cấu trúc buồng tim và huyết động van tim', 1, 0),
('DV_NSDD', 'CK_NOI', 'Nội soi dạ dày gây mê', 900000.00, 'Lần', 'Nội soi đường tiêu hóa trên phát hiện loét, polyp', 1, 0),
('DV_XNBL', 'CK_NOI', 'Xét nghiệm vi khuẩn HP qua hơi thở (Urea Breath Test)', 450000.00, 'Lần', 'Kiểm tra nhiễm Helicobacter pylori đường dạ dày', 1, 0);

INSERT INTO `donthuoc` (`MADONTHUOC`, `MABENHAN`, `NGAYKEDON`, `LOIDAN`, `TRANGTHAIXOA`) VALUES
('DT001', 'BA001', '2026-09-18', 'Uống đều mỗi ngày không tự ý ngưng thuốc hạ áp', 0),
('DT002', 'BA002', '2026-09-18', 'Kiên trì dùng đủ đợt điều trị kháng tiết axit', 0);

INSERT INTO `hoadon` (`MAHOADON`, `MABENHAN`, `MANHANVIEN`, `TIENKHACHDUA`, `TIENTHOILAI`, `TONGTIEN`, `PHUONGTHUCTHANHTOAN`, `TRANGTHAITHANHTOAN`, `THOIGIANTHANHTOAN`, `NGAYTAO`, `TRANGTHAIXOA`) VALUES
('HD001', 'BA001', 'NV002', 1400000.00, 98000.00, 1302000.00, 'TienMat', 'DaThanhToan', '2026-09-18 02:40:00', '2026-09-18 01:33:17', 0),
('HD002', 'BA002', 'NV002', 1352000.00, 0.00, 1352000.00, 'ChuyenKhoan', 'DaThanhToan', '2026-09-18 03:15:00', '2026-09-18 01:33:17', 0);

INSERT INTO `lichhenkham` (`MALICHHEN`, `MABENHNHAN`, `MABACSI`, `MALICHTRUC`, `NGAYHEN`, `GIOHEN`, `LYDOKHAM`, `NGAYTAO`, `TRANGTHAI`, `TRANGTHAIXOA`) VALUES
('LH001', 'BN001', 'BS001', 'LT001', '2026-09-18', '08:00:00', 'Đau thắt ngực khi gắng sức, chóng mặt', '2026-09-18 01:33:16', 'DaDen', 0),
('LH002', 'BN002', 'BS002', 'LT002', '2026-09-18', '08:30:00', 'Đau rát vùng thượng vị nhiều ngày qua', '2026-09-18 01:33:16', 'DaDen', 0),
('LH003', 'BN003', 'BS003', 'LT003', '2026-09-18', '14:00:00', 'Sốt cao, ho có đờm', '2026-09-18 01:33:16', 'DaDat', 0);

INSERT INTO `lichtrucbacsi` (`MALICHTRUC`, `MABACSI`, `MAPHONG`, `NGAYKHAM`, `GIOBATDAU`, `GIOKETTHUC`, `SOLUONGTOIDA`, `TRANGTHAI`, `TRANGTHAIXOA`) VALUES
('LT001', 'BS001', 'PK102', '2026-09-18', '07:30:00', '11:30:00', 25, 'MoDangKy', 0),
('LT002', 'BS002', 'PK101', '2026-09-18', '07:30:00', '11:30:00', 30, 'MoDangKy', 0),
('LT003', 'BS003', 'PK201', '2026-09-18', '13:30:00', '17:00:00', 20, 'MoDangKy', 0);

INSERT INTO `nguoidung` (`MANGUOIDUNG`, `TENDANGNHAP`, `MATKHAU`, `HOTEN`, `EMAIL`, `SODIENTHOAI`, `VAITRO`, `TRANGTHAI`, `TRANGTHAIXOA`, `NGAYTAO`, `NGAYCAPNHAT`) VALUES
('DEVELOPER', 'devel', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'Dev Dev Dev', 'dev@clinic.vn', '1111111111', 'DEV', 'ACTIVE', 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16'),
('ND001', 'admin', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'Nguyễn Quản Trị', 'admin@clinic.vn', '0901000001', 'ADMIN', 'LOCKED', 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16'),
('ND002', 'dr_nam', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'BS.CKII Trần Văn Nam', 'nam.tv@clinic.vn', '0902000002', 'STAFF', 'LOCKED', 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16'),
('ND003', 'dr_lan', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'ThS.BS Lê Thị Lan', 'lan.lt@clinic.vn', '0903000003', 'DOCTOR', 'LOCKED', 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16'),
('ND004', 'dr_duc', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'BS Phạm Minh Đức', 'duc.pm@clinic.vn', '0904000004', 'DOCTOR', 'ACTIVE', 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16'),
('ND005', 'nv_mai', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'Hoàng Tuyết Mai', 'mai.ht@clinic.vn', '0905000005', 'STAFF', 'ACTIVE', 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16'),
('ND006', 'nv_hung', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'Vũ Quốc Hùng', 'hung.vq@clinic.vn', '0906000006', 'STAFF', 'LOCKED', 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16'),
('ND007', 'bn_an', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'Nguyễn Văn An', 'an.nguyen@gmail.com', '0912345678', 'PATIENT', 'LOCKED', 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16'),
('ND008', 'bn_binh', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'Trần Thị Bình', 'binh.tran@gmail.com', '0913456789', 'PATIENT', 'ACTIVE', 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16'),
('ND009', 'bn_cuong', '$2a$10$kCLfZBaLWwsLiUpFd2tqm.bB9Mh0fDd7qJyhNSnceFnXqdNPLL/Fq', 'Lê Hùng Cường', 'cuong.le@gmail.com', '0914567890', 'PATIENT', 'ACTIVE', 0, '2026-09-18 01:33:16', '2026-09-18 01:33:16');

INSERT INTO `nhanvien` (`MANHANVIEN`, `MANGUOIDUNG`, `VITRI`, `NGAYVAOLAM`, `TRANGTHAIXOA`) VALUES
('NV001', 'ND005', 0, '2023-01-15', 0),
('NV002', 'ND006', 1, '2023-03-01', 0);

INSERT INTO `phongkham` (`MAPHONG`, `MACHUYENKHOA`, `SOPHONG`, `TENPHONG`, `TANG`, `TRANGTHAI`, `TRANGTHAIXOA`) VALUES
('PK101', 'CK_NOI', 'P.101', 'Phòng Khám Nội 1', 'Tầng 1', 0, 0),
('PK102', 'CK_TIM', 'P.102', 'Phòng Khám Tim Mạch', 'Tầng 1', 0, 0),
('PK201', 'CK_NHI', 'P.201', 'Phòng Khám Nhi Đồng', 'Tầng 2', 0, 0),
('PKCL01', 'CK_NOI', 'P.CL01', 'Phòng Xét Nghiệm - Siêu Âm', 'Tầng Trệt', 0, 0);

INSERT INTO `thuoc` (`MATHUOC`, `TENTHUOC`, `HOATCHAT`, `DONVITINH`, `DONGIA`, `SOLUONGTON`, `HUONGDANDUNG`, `TRANGTHAIXOA`) VALUES
('TH001', 'Amlor 5mg', 'Amlodipine besylate', 'Viên', 10500.00, 1500, 'Uống 1 viên vào mỗi buổi sáng sau ăn', 0),
('TH002', 'Lipitor 20mg', 'Atorvastatin', 'Viên', 22000.00, 800, 'Uống 1 viên buổi tối trước khi đi ngủ', 0),
('TH003', 'Nexium 40mg', 'Esomeprazole', 'Viên', 24000.00, 1200, 'Uống 1 viên trước ăn sáng 30 phút', 0),
('TH004', 'Kremil-S', 'Aluminium hydroxide + Simethicone', 'Viên', 2500.00, 2000, 'Nhai 1 viên sau ăn khi xuất hiện đau rát hoặc ợ chua', 0),
('TH005', 'Amoxicillin 500mg', 'Amoxicillin trihydrate', 'Viên', 4000.00, 3000, 'Uống 1 viên x 2 lần/ngày sau khi ăn', 0);

INSERT INTO `tiepdonkham` (`MATIEPDON`, `MABENHNHAN`, `MANHANVIEN`, `MAPHONG`, `MABACSI`, `MALICHHEN`, `NGAYTIEPDON`, `SOTHUTU`, `LOAITIEPDON`, `TRANGTHAIHANGDOI`, `TRIEUCHUNGBANDAU`, `MACH`, `NHIETDO`, `HUYETAP`, `CANNANG`, `CHIEUCAO`, `XTHOIGIANTIEPDON`, `TRANGTHAIXOA`) VALUES
('TD001', 'BN001', 'NV001', 'PK102', 'BS001', 'LH001', '2026-09-18', 1, 'HenTruoc', 'DaKham', 'Đau tức ngực, hồi hộp khó thở nhẹ', 82, 36.8, '140/90', 68.50, 168.00, '2026-09-18 01:33:16', 0),
('TD002', 'BN002', 'NV001', 'PK101', 'BS002', 'LH002', '2026-09-18', 2, 'HenTruoc', 'DaKham', 'Đau vùng thượng vị âm ỉ, buồn nôn', 76, 37.0, '115/75', 52.00, 158.00, '2026-09-18 01:33:16', 0);
