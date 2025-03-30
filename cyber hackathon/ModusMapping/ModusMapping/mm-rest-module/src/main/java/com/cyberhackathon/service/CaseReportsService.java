package com.cyberhackathon.service;

import com.cyberhackathon.entity.Case;
import com.cyberhackathon.entity.Criminal;
import com.cyberhackathon.entity.User;
import com.cyberhackathon.model.*;
import com.cyberhackathon.repository.jpa.CaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CaseReportsService {


    private final CaseRepository caseRepository;
    @Autowired
    public CaseReportsService(CaseRepository caseRepository) {
        this.caseRepository = caseRepository;
    }


    public List<CaseReportsDTO> getAllCases() {
        return caseRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private CaseReportsDTO mapToDTO(Case c) {
        // Extract unique Criminal Names from related Crimes
        String criminalNames = Optional.ofNullable(c.getCrimes()).orElse(Collections.emptySet()).stream()
                .flatMap(crime -> Optional.ofNullable(crime.getCriminals()).orElse(Collections.emptySet()).stream())
                .map(criminal -> Optional.ofNullable(criminal.getName()).orElse("Unknown"))
                .distinct()
                .collect(Collectors.joining(", "));

        return new CaseReportsDTO(
                c.getId(),
                c.getCaseNumber(),
                c.getTitle(),
                c.getDescription(),
                c.getStatus().name(),
                String.format("%04d-%02d", c.getYear(), c.getMonth()), // Formats as YYYY-MM
                mapOfficerToDTO(c),
                criminalNames.isEmpty() ? "Unknown" : criminalNames
        );
    }

    private OfficerResponseDTO mapOfficerToDTO(Case c) {
        return Optional.ofNullable(c.getOfficer())
                .map(officer -> new OfficerResponseDTO(
                        officer.getId(),
                        Optional.ofNullable(officer.getUser()).map(User::getName).orElse("Unknown"),
                        officer.getBadgeNumber(),
                        officer.getDepartment()
                )).orElse(null);
    }

    public CaseReportDTO getCaseReport(Long caseId) {
        Case caseEntity = caseRepository.findCaseReportById(caseId)
                .orElseThrow(() -> new RuntimeException("Case not found"));

        return new CaseReportDTO(
                caseEntity.getId(),
                caseEntity.getCaseNumber(),
                caseEntity.getTitle(),
                caseEntity.getDescription(),
                caseEntity.getStatus().name(),
                String.format("%04d-%02d", caseEntity.getYear(), caseEntity.getMonth()),
                caseEntity.getOfficer() != null ? new OfficerResponseDTO(
                        caseEntity.getOfficer().getId(),
                        caseEntity.getOfficer().getUser().getName(),
                        caseEntity.getOfficer().getBadgeNumber(),
                        caseEntity.getOfficer().getDepartment()
                ) : null,
                caseEntity.getCrimes().stream().map(crime -> new CrimesDTO(
                        crime.getId(),
                        crime.getCriminals().stream()
                                .map(Criminal::getName)
                                .distinct()
                                .collect(Collectors.joining(", ")), // Concatenates unique criminal names
                        crime.getCrimeType(),
                        crime.getLocation(),
                        crime.getCrimeDate().toString(), // Convert Date to String
                        caseEntity.getOfficer() != null ? caseEntity.getOfficer().getUser().getName() : "Unknown"
                )).collect(Collectors.toList()),
                caseEntity.getCrimes().stream()
                        .flatMap(crime -> crime.getCriminals().stream())
                        .map(criminal -> new CriminalDTO(
                                criminal.getName(),
                                criminal.getAlias(),
                                String.valueOf(criminal.getDob()),
                                criminal.getPhoneNumber(),
                                criminal.getAddress(),
                                criminal.getCriminalHistory()
                        )).distinct().collect(Collectors.toList()),
                caseEntity.getEvidence().stream().map(evidence -> new EvidenceDTO(
                        evidence.getEvidenceType(),
                        evidence.getDescription(),
                        evidence.getAddedBy().getName()
                )).collect(Collectors.toList())
        );
    }
}
