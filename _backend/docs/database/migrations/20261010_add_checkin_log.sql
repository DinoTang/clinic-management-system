-- Bảng lưu vết mỗi lần quét QR / tra cứu lịch hẹn tại quầy tiếp đón.
-- Dùng để: chống quét trùng (đối chiếu với lichhenkham.TRANGTHAI), lưu vết ai quét lúc nào,
-- và gắn lượt tiếp đón thực tế (tiepdonkham) vào đúng lần quét.
CREATE TABLE IF NOT EXISTS lichsucheckin (
    MALICHSU      varchar(20)  NOT NULL,
    MALICHHEN     varchar(20)  NOT NULL,
    MABENHNHAN    varchar(20)  DEFAULT NULL,
    MATIEPDON     varchar(20)  DEFAULT NULL,
    MANHANVIEN    varchar(20)  DEFAULT NULL,
    PHUONGTHUC    varchar(20)  NOT NULL DEFAULT 'QR',
    KETQUA        varchar(30)  NOT NULL,
    GHICHU        varchar(255) DEFAULT NULL,
    THOIGIANQUET  datetime     NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (MALICHSU),
    KEY idx_lichsucheckin_lichhen (MALICHHEN),
    KEY idx_lichsucheckin_thoigian (THOIGIANQUET)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
