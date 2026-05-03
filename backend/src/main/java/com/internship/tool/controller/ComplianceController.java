package com.internship.tool.controller;

import com.internship.tool.entity.ComplianceRecord;
import com.internship.tool.service.ComplianceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/records")
public class ComplianceController {

    private final ComplianceService service;

    public ComplianceController(ComplianceService service) {
        this.service = service;
    }

    @PostMapping
    public ComplianceRecord create(@RequestBody ComplianceRecord record) {
        return service.createRecord(record);
    }

    @GetMapping
    public List<ComplianceRecord> getAll() {
        return service.getAllRecords();
    }

    @GetMapping("/{id}")
    public ComplianceRecord getById(@PathVariable Long id) {
        return service.getRecordById(id);
    }
}