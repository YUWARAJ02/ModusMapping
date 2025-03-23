package com.cyberhackathon.contract.dashboard;

public class LineChart {

    private String date;
    private String location;
    private Object count;

    public LineChart() {
    }

    public LineChart(String date, String location, Object count) {
        this.date = date;
        this.location = location;
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

    public Object getCount() {
        return count;
    }

    public void setCount(Object count) {
        this.count = count;
    }
}
