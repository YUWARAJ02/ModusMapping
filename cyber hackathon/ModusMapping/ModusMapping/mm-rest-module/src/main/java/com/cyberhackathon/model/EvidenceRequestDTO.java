package com.cyberhackathon.model;

public class EvidenceRequestDTO {
    private String evidenceType;
    private String description;

    public String getEvidenceType() {
        return evidenceType;
    }

    public void setEvidenceType(String evidenceType) {
        this.evidenceType = evidenceType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public EvidenceRequestDTO(String evidenceType, String description) {
        this.evidenceType = evidenceType;
        this.description = description;
    }

    public EvidenceRequestDTO() {
    }
}