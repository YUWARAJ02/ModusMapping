package com.cyberhackathon.model;

public class EvidenceDTO {
    private String evidenceType;
    private String description;
    private String addedBy;

    public EvidenceDTO(String evidenceType, String description, String addedBy) {
        this.evidenceType = evidenceType;
        this.description = description;
        this.addedBy = addedBy;
    }

    public String getEvidenceType() { return evidenceType; }
    public void setEvidenceType(String evidenceType) { this.evidenceType = evidenceType; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getAddedBy() { return addedBy; }
    public void setAddedBy(String addedBy) { this.addedBy = addedBy; }

    public EvidenceDTO() {
    }
}
