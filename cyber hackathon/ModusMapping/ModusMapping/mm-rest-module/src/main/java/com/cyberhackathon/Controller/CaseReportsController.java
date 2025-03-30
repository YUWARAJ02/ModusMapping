package com.cyberhackathon.Controller;

import com.cyberhackathon.model.CaseReportDTO;
import com.cyberhackathon.model.CaseReportsDTO;
import com.cyberhackathon.model.CreateCaseRequestDTO;
import com.cyberhackathon.repository.jpa.*;
import com.cyberhackathon.service.CaseReportsService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CaseReportsController {
    @Autowired
    private CaseReportsService caseReportsService;

    @GetMapping("/cases")
    public List<CaseReportsDTO> getCaseReports() {
        return caseReportsService.getAllCases();
    }

    @GetMapping("/cases/{caseId}")
    public ResponseEntity<CaseReportDTO> getCaseReport(@PathVariable Long caseId) {
        CaseReportDTO caseReport = caseReportsService.getCaseReport(caseId);
        return ResponseEntity.ok(caseReport);
    }

    @PostMapping("/cases/create/{officerId}")
    @Transactional
    public Map<String,Boolean> createCase(@PathVariable Long officerId,
                          @RequestBody CreateCaseRequestDTO caseRequest) {
        return caseReportsService.insertCase(officerId,caseRequest);
        // Validate officer
    }
}
