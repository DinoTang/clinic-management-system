package com.clinic.management._billing;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Billing API — theo _backend/docs/api/api-contract.md:
 *   GET    /api/billing/unpaid
 *   GET    /api/billing/invoices/{id}
 *   PUT    /api/billing/invoices/{id}/payment
 * Alias (team-task-assignment.md §5.5):
 *   POST   /api/invoices
 *   GET    /api/invoices/{id}
 *   PUT    /api/invoices/{id}/payment
 * Lỗi nghiệp vụ (BR-xxx) ném IllegalArgumentException → GlobalExceptionHandler → HTTP 400 {message}.
 */
@RestController
@RequestMapping("/api")
public class BillingController {

    private final BillingService billingService;
    private final InvoiceRepository invoiceRepository;

    public BillingController(BillingService billingService, InvoiceRepository invoiceRepository) {
        this.billingService = billingService;
        this.invoiceRepository = invoiceRepository;
    }

    @GetMapping("/billing/unpaid")
    public List<Invoice> listUnpaid() {
        return billingService.listUnpaid();
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
