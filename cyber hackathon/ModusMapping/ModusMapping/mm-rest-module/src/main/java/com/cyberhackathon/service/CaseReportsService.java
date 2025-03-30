package com.cyberhackathon.service;

import com.cyberhackathon.entity.*;
import com.cyberhackathon.model.*;
import com.cyberhackathon.repository.jpa.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CaseReportsService {

    @Autowired
    private CaseRepository caseRepository;
    @Autowired
    private OfficerRepository officerRepository;
    @Autowired
    private CriminalRepository criminalRepository;
    @Autowired
    private CrimeRepository crimeRepository;
    @Autowired
    private EvidenceRepository evidenceRepository;


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

    public Map<String, Boolean> insertCase(Long officerId, CreateCaseRequestDTO caseRequest) {
        Officer officer = officerRepository.findById(officerId)
                .orElseThrow(() -> new RuntimeException("Officer not found with ID: " + officerId));

        Case newCase = new Case();
        newCase.setCaseNumber(caseRequest.getCaseNumber());
        newCase.setTitle(caseRequest.getTitle());
        newCase.setDescription(caseRequest.getDescription());
//        newCase.setStatus(caseRequest.getStatus()); todo:check by officer permission
        newCase.setYear(caseRequest.getYear());
        newCase.setMonth(caseRequest.getMonth());
        newCase.setOfficer(officer);
        caseRepository.save(newCase);

        Crime crime = new Crime();
        crime.setCriminalCase(newCase);
        crime.setCrimeDate(java.sql.Date.valueOf(caseRequest.getCrimeDate())); // Convert String to Date
        crime.setCrimeType(caseRequest.getCrimeType());
        crime.setLocation(caseRequest.getLocation());
        crime.setDescription(caseRequest.getCrimeDescription());
        crimeRepository.save(crime);

        if (caseRequest.getCriminalIds() != null) {
            List<Criminal> criminals = criminalRepository.findAllById(caseRequest.getCriminalIds());
            crime.setCriminals(new HashSet<>(criminals));
            crimeRepository.save(crime);
        }

        // 🔹 Add Evidence & Link to Case
        if (caseRequest.getEvidences() != null) {
            for (EvidenceRequestDTO evidenceReq : caseRequest.getEvidences()) {
                Evidence evidence = new Evidence();
                evidence.setCriminalCase(newCase);
                evidence.setEvidenceType(evidenceReq.getEvidenceType());
                evidence.setDescription(evidenceReq.getDescription());
                evidence.setAddedBy(officer.getUser());  // Officer is linked to a user
                evidenceRepository.save(evidence);
            }
        }

        return Map.of("ans", true);
    }
}
