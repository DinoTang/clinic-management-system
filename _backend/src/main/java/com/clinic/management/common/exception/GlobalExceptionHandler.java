package com.clinic.management.common.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(
    	MethodArgumentNotValidException ex
    ) {
        Map<String, String> errors = new HashMap<>();
        
        ex.getBindingResult().getFieldErrors().forEach(error -> 
            errors.put(error.getField(), error.getDefaultMessage())
        );
        
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgument(IllegalArgumentException ex) {
        return new ResponseEntity<>(Map.of("message", ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrity(DataIntegrityViolationException ex) {
        String detail = ex.getMostSpecificCause().getMessage() == null ? "" : ex.getMostSpecificCause().getMessage();
        String message;
        if (detail.contains("Duplicate entry")) {
            message = "Dữ liệu đã tồn tại (vi phạm khóa chính/duy nhất).";
        } else if (detail.contains("TRANGTHAIXOA")) {
            message = "Dữ liệu không hợp lệ: cờ TRANGTHAIXOA không được để trống.";
        } else {
            message = "Dữ liệu vi phạm ràng buộc khóa ngoại hoặc dữ liệu trùng.";
        }
        return new ResponseEntity<>(Map.of("message", message, "detail", detail), HttpStatus.BAD_REQUEST);
    }
}
