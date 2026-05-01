package com.internship.tool.service;

import com.internship.tool.entity.ComplianceRecord;
import com.internship.tool.exception.ResourceNotFoundException;
import com.internship.tool.exception.ValidationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ComplianceService {

    private final List<ComplianceRecord> records = new ArrayList<>();

    // CREATE
    public ComplianceRecord createRecord(ComplianceRecord record) {
        validate(record);
        records.add(record);
        return record;
    }

    // GET ALL
    public List<ComplianceRecord> getAllRecords() {
        return records;
    }

    // GET BY ID
    public ComplianceRecord getRecordById(Long id) {
        return records.stream()
                .filter(r -> r.getId().equals(id))
                .findFirst()
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
