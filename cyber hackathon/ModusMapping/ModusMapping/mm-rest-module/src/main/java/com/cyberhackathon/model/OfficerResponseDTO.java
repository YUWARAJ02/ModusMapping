package com.cyberhackathon.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public class OfficerResponseDTO {
    private Long id;
    private String name;
    private String badgeNumber;
    private String department;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBadgeNumber() {
        return badgeNumber;
    }

    public void setBadgeNumber(String badgeNumber) {
        this.badgeNumber = badgeNumber;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public OfficerResponseDTO(Long id, String name, String badgeNumber, String department) {
        this.id = id;
        this.name = name;
        this.badgeNumber = badgeNumber;
        this.department = department;
    }

    public OfficerResponseDTO() {
    }
}
