package com.cyberhackathon.Controller;

import com.cyberhackathon.model.CaseReportDTO;
import com.cyberhackathon.model.CaseReportsDTO;
import com.cyberhackathon.service.CaseReportsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
