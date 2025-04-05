package com.cyberhackathon.model;

import com.cyberhackathon.entity.Criminal;

public class CriminalDTO {
    private String criminalHistory;
    private String name;
    private String alias;
    private String dob;
    private String phoneNumber;
    private String address;
    private String history;
    private String description;
    private Long id;

    public String getCriminalHistory() {
        return criminalHistory;
    }

    public void setCriminalHistory(String criminalHistory) {
        this.criminalHistory = criminalHistory;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CriminalDTO(Criminal criminal) {
        this.id = criminal.getId();
        this.name = criminal.getName();
        this.alias = criminal.getAlias();
        this.dob = String.valueOf(criminal.getDob());
        this.phoneNumber = criminal.getPhoneNumber();
        this.address = criminal.getAddress();
        this.criminalHistory = criminal.getCriminalHistory();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public CriminalDTO(Long id, String name, String alias, String dob, String phoneNumber, String address, String history) {
        this.id = id;
        this.name = name;
        this.alias = alias;
        this.dob = dob;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.history = history;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getHistory() {
        return history;
    }

    public void setHistory(String history) {
        this.history = history;
    }

}
