-- Di dời bệnh nhân vắng mặt xuống cuối hàng chờ nhưng giữ nguyên STT
ALTER TABLE tiepdonkham
    ADD COLUMN THOIGIANHOAN datetime DEFAULT NULL,
    ADD COLUMN SOLANHOAN int(11) DEFAULT 0;
