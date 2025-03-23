package com.cyberhackathon.contract.dashboard;


public class BarGraphData {

    private String date;
    private String location;
    private String crimeType;
    private Object count;

    public BarGraphData() {
    }

    public BarGraphData(String date, String location, String crimeType, Object count) {
        this.date = date;
        this.location = location;
        this.crimeType = crimeType;
        this.count = count;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCrimeType() {
        return crimeType;
    }

    public void setCrimeType(String crimeType) {
        this.crimeType = crimeType;
    }

    public Object getCount() {
        return count;
    }

    public void setCount(Object count) {
        this.count = count;
    }
}
