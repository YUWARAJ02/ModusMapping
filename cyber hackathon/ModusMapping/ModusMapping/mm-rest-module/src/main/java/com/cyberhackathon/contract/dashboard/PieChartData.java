package com.cyberhackathon.contract.dashboard;

public class PieChartData {

    private String Date;
    private String crimeType;
    private String officerName;
    private String criminalName;

    public String getDate() {
        return Date;
    }

    public void setDate(String date) {
        Date = date;
    }

    public String getCrimeType() {
        return crimeType;
    }

    public void setCrimeType(String crimeType) {
        this.crimeType = crimeType;
    }

    public String getOfficerName() {
        return officerName;
    }

    public void setOfficerName(String officerName) {
        this.officerName = officerName;
    }

    public String getCriminalName() {
        return criminalName;
    }

    public void setCriminalName(String criminalName) {
        this.criminalName = criminalName;
    }

    public PieChartData(String date, String crimeType, String officerName, String criminalName) {
        Date = date;
        this.crimeType = crimeType;
        this.officerName = officerName;
        this.criminalName = criminalName;
    }

    public PieChartData() {}
}
