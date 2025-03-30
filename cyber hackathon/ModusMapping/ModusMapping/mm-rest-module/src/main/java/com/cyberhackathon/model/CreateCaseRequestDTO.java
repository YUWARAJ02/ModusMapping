package com.cyberhackathon.model;

import java.util.List;

public class CreateCaseRequestDTO {
    private String caseNumber;
    private String title;
    private String description;
    private String status;  // "open" or "closed"
    private int year;
    private int month;

    private String crimeType;
    private String crimeDate;
    private String location;
    private String crimeDescription;

    private List<Long> criminalIds;  // Existing Criminals
    private List<EvidenceRequestDTO> evidences;  // List of Evidence

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

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public String getCrimeType() {
        return crimeType;
    }

    public void setCrimeType(String crimeType) {
        this.crimeType = crimeType;
    }

    public String getCrimeDate() {
        return crimeDate;
    }

    public void setCrimeDate(String crimeDate) {
        this.crimeDate = crimeDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCrimeDescription() {
        return crimeDescription;
    }

    public void setCrimeDescription(String crimeDescription) {
        this.crimeDescription = crimeDescription;
    }

    public List<Long> getCriminalIds() {
        return criminalIds;
    }

    public void setCriminalIds(List<Long> criminalIds) {
        this.criminalIds = criminalIds;
    }

    public List<EvidenceRequestDTO> getEvidences() {
        return evidences;
    }

    public void setEvidences(List<EvidenceRequestDTO> evidences) {
        this.evidences = evidences;
    }

    public CreateCaseRequestDTO(String caseNumber, String title, String description, String status, int year, int month, String crimeType, String crimeDate, String location, String crimeDescription, List<Long> criminalIds, List<EvidenceRequestDTO> evidences) {
        this.caseNumber = caseNumber;
        this.title = title;
        this.description = description;
        this.status = status;
        this.year = year;
        this.month = month;
        this.crimeType = crimeType;
        this.crimeDate = crimeDate;
        this.location = location;
        this.crimeDescription = crimeDescription;
        this.criminalIds = criminalIds;
        this.evidences = evidences;
    }

    public CreateCaseRequestDTO() {
    }
}
