package com.clinic.management._billing;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import com.clinic.management.common.enums.PaymentMethod;
import com.clinic.management.common.enums.PaymentStatus;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BillingController {

    private final BillingService billingService;
    private final InvoiceRepository invoiceRepository;

    public BillingController(BillingService billingService, InvoiceRepository invoiceRepository) {
        this.billingService = billingService;
        this.invoiceRepository = invoiceRepository;
    }

    @GetMapping({"/billing/invoices/paginate", "/invoices/paginate"})
    public Page<Invoice> listInvoicesPaginate(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String method,
            @RequestParam(required = false) String search
    ) {
        PaymentStatus paymentStatus = (status != null && !status.isBlank() && !"all".equalsIgnoreCase(status))
                ? PaymentStatus.valueOf(status.trim().toUpperCase())
                : null;

        PaymentMethod paymentMethod = (method != null && !method.isBlank() && !"all".equalsIgnoreCase(method))
                ? PaymentMethod.valueOf(method.trim().toUpperCase())
                : null;

        return billingService.findAll(page, size, paymentStatus, paymentMethod, search);
    }

    @GetMapping("/billing/unpaid")
    public List<Invoice> listUnpaid() {
        return billingService.listUnpaid();
    }

    @GetMapping({"/billing/invoices", "/invoices"})
    public List<Invoice> listInvoices(@RequestParam(required = false) String status) {
        if (status != null && !status.isBlank()) {
            return invoiceRepository.findByPaymentStatusAndDeletedFalseOrderByCreatedAtDesc(status);
        }
        return invoiceRepository.findByDeletedFalseOrderByCreatedAtDesc();
    }

    @GetMapping({"/billing/invoices/{id}", "/invoices/{id}"})
    public ResponseEntity<Invoice> getInvoice(@PathVariable String id) {
        return billingService.findById(id)
                .map(inv -> ResponseEntity.ok(billingService.withDetails(inv)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping({"/billing/invoices/{id}/payment", "/invoices/{id}/payment"})
    public ResponseEntity<Invoice> pay(@PathVariable String id, @RequestBody PaymentRequest request) {
        return billingService.findById(id)
                .map(inv -> ResponseEntity.ok(billingService.pay(inv, request)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /* IllegalArgumentException (BR-xxx) do GlobalExceptionHandler bắt → 400 {message}. */
    @PostMapping("/invoices")
    public ResponseEntity<Invoice> create(@RequestBody InvoiceCreateRequest request) {
        return ResponseEntity.ok(billingService.create(request));
    }
}
