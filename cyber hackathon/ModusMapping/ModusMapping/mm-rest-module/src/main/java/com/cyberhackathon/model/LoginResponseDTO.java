package com.cyberhackathon.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class LoginResponseDTO {
    private Long userId;
    private String role;
    private String message;

    public LoginResponseDTO(Long userId, String role, String message) {
        this.userId = userId;
        this.role = role;
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LoginResponseDTO() {
    }
}

