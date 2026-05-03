package com.internship.tool.service;

import com.internship.tool.entity.ComplianceRecord;
import com.internship.tool.exception.ResourceNotFoundException;
import com.internship.tool.exception.ValidationException;
import com.internship.tool.repository.ComplianceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplianceService {

    private final ComplianceRepository repository;

    public ComplianceService(ComplianceRepository repository) {
        this.repository = repository;
    }

    // CREATE
    public ComplianceRecord createRecord(ComplianceRecord record) {
        validate(record);
        return repository.save(record); // 🔥 real DB save
    }

    // GET ALL
    public List<ComplianceRecord> getAllRecords() {
        return repository.findAll();
    }

    // GET BY ID
    public ComplianceRecord getRecordById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Record not found"));
    }

    // VALIDATION
    private void validate(ComplianceRecord record) {
        if (record.getTitle() == null || record.getTitle().isEmpty()) {
            throw new ValidationException("Title is required");
        }
        if (record.getScore() == null || record.getScore() < 0) {
            throw new ValidationException("Invalid score");
        }
    }
}