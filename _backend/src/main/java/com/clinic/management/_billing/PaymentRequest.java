package com.clinic.management._billing;

import java.math.BigDecimal;

/**
 * Request thanh toán hóa đơn.
 * method: CASH | BANK_TRANSFER | CARD (BR-058) hoặc dạng DB: TienMat | ChuyenKhoan | The.
 * amountGiven: số tiền khách đưa (TIENKHACHDUA).
 */
public class PaymentRequest {

    private String method;
    private BigDecimal amountGiven;

    public PaymentRequest() {
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public BigDecimal getAmountGiven() {
        return amountGiven;
    }

    public void setAmountGiven(BigDecimal amountGiven) {
        this.amountGiven = amountGiven;
    }
}
