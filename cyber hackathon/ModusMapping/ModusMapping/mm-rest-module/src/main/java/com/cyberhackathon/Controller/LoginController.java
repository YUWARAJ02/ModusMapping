package com.cyberhackathon.Controller;

import com.cyberhackathon.model.LoginRequestDTO;
import com.cyberhackathon.model.LoginResponseDTO;
import com.cyberhackathon.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/auth/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO request) {
        return loginService.validateLoginCredentials(request);
    }
}
