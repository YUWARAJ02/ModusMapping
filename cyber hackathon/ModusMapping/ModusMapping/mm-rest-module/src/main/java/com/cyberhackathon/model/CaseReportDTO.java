package com.cyberhackathon.model;

import java.util.List;

public class CaseReportDTO {
    private Long id;
    private String caseNumber;
    private String title;
    private String description;
    private String status;
    private String registeredOn;
    private OfficerResponseDTO officer;
    private List<CrimesDTO> crimes;
    private List<CriminalDTO> criminals;
    private List<EvidenceDTO> evidence;

    public CaseReportDTO(Long id, String caseNumber, String title, String description, String status, String registeredOn,
                         OfficerResponseDTO officer, List<CrimesDTO> crimes, List<CriminalDTO> criminals, List<EvidenceDTO> evidence) {
        this.id = id;
        this.caseNumber = caseNumber;
        this.title = title;
        this.description = description;
        this.status = status;
        this.registeredOn = registeredOn;
        this.officer = officer;
        this.crimes = crimes;
        this.criminals = criminals;
        this.evidence = evidence;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCaseNumber() {
        return caseNumber;
    }

    public void setCaseNumber(String caseNumber) {
        this.caseNumber = caseNumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRegisteredOn() {
        return registeredOn;
    }

    public void setRegisteredOn(String registeredOn) {
        this.registeredOn = registeredOn;
    }

    public OfficerResponseDTO getOfficer() {
        return officer;
    }

    public void setOfficer(OfficerResponseDTO officer) {
        this.officer = officer;
    }

    public List<CrimesDTO> getCrimes() {
        return crimes;
    }

    public void setCrimes(List<CrimesDTO> crimes) {
        this.crimes = crimes;
    }

    public List<CriminalDTO> getCriminals() {
        return criminals;
    }

    public void setCriminals(List<CriminalDTO> criminals) {
        this.criminals = criminals;
    }

    public List<EvidenceDTO> getEvidence() {
        return evidence;
    }
}
