package com.cyberhackathon.model;

public class UsersDTO {
    private String name;
    private String email;
    private String phoneNumber;
    private String roleName;

    // Constructors
    public UsersDTO() {}

    public UsersDTO(String name, String email, String phoneNumber, String roleName) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.roleName = roleName;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getRoleName() { return roleName; }
    public void setRoleName(String roleName) { this.roleName = roleName; }
}
