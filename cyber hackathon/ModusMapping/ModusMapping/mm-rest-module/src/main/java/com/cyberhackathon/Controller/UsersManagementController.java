package com.cyberhackathon.Controller;

import com.cyberhackathon.model.UsersDTO;
import com.cyberhackathon.service.UsersManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UsersManagementController {

    @Autowired
    private UsersManagementService usersManagementService;

    @GetMapping("/users")
    public ResponseEntity<List<UsersDTO>> getAllUsers() {
        List<UsersDTO> users = usersManagementService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}