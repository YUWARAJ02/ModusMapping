package com.cyberhackathon.Controller;

import com.cyberhackathon.model.CaseReportDTO;
import com.cyberhackathon.model.CaseReportsDTO;
import com.cyberhackathon.model.CreateCaseRequestDTO;
import com.cyberhackathon.service.CaseReportsService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public Map<String, String> createCase(@PathVariable Long officerId,
                                           @RequestBody CreateCaseRequestDTO caseRequest) {
        return caseReportsService.insertCase(officerId, caseRequest);
    }

    @PutMapping("/cases/{id}/status")
    public ResponseEntity<String> updateStatus(@PathVariable Long id) {
        boolean updated = caseReportsService.updateCaseStatus(id);
        if (updated) {
            return ResponseEntity.ok("Case status updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Case not found.");
        }
    }

    @GetMapping("/cases/waiting")
    public List<CaseReportsDTO> getWaitingCase() {
        return caseReportsService.getAllCasesWaitingForApproval();
    }

    @DeleteMapping("/cases/{id}")
    public ResponseEntity<String> deleteCase(@PathVariable Long id) {
        boolean deleted = caseReportsService.deleteCaseById(id);
        if (deleted) {
            return ResponseEntity.ok("Case deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Case not found.");
        }
    }

}
