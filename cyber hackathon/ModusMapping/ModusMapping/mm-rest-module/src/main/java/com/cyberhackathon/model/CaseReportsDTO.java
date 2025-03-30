package com.cyberhackathon.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class CaseReportsDTO {
    private Long id;
    private String caseNumber;
    private String title;
    private String description;
    private String status;
    private String registeredOn;
    private OfficerResponseDTO officer;
    private String criminalNames;

    public String getCriminalNames() {
        return criminalNames;
    }

    public void setCriminalNames(String criminalNames) {
        this.criminalNames = criminalNames;
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

    public CaseReportsDTO(Long id, String caseNumber, String title, String description, String status, String registeredOn, OfficerResponseDTO officer,String criminalNames) {
        this.id = id;
        this.caseNumber = caseNumber;
        this.title = title;
        this.description = description;
        this.status = status;
        this.registeredOn = registeredOn;
        this.officer = officer;
        this.criminalNames=criminalNames;
    }

    public CaseReportsDTO() {
    }
}
