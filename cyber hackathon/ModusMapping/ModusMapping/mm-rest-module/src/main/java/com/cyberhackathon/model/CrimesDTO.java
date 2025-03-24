package com.cyberhackathon.model;

public class CrimesDTO {
    private Long crimeId;
    private String criminalNames;
    private String crimeType;
    private String crimeLocation;
    private String crimeDate;
    private String investigator;

    public CrimesDTO(Long crimeId, String criminalNames, String crimeType, String crimeLocation, String crimeDate, String investigator) {
        this.crimeId = crimeId;
        this.criminalNames = criminalNames;
        this.crimeType = crimeType;
        this.crimeLocation = crimeLocation;
        this.crimeDate = crimeDate;
        this.investigator = investigator;
    }

    public Long getCrimeId() { return crimeId; }
    public void setCrimeId(Long crimeId) { this.crimeId = crimeId; }

    public String getCriminalNames() { return criminalNames; }
    public void setCriminalNames(String criminalNames) { this.criminalNames = criminalNames; }

    public String getCrimeType() { return crimeType; }
    public void setCrimeType(String crimeType) { this.crimeType = crimeType; }

    public String getCrimeLocation() { return crimeLocation; }
    public void setCrimeLocation(String crimeLocation) { this.crimeLocation = crimeLocation; }

    public String getCrimeDate() { return crimeDate; }
    public void setCrimeDate(String crimeDate) { this.crimeDate = crimeDate; }

    public String getInvestigator() { return investigator; }
    public void setInvestigator(String investigator) { this.investigator = investigator; }
}

