package com.cyberhackathon.service;

import com.cyberhackathon.entity.User;
import com.cyberhackathon.model.LoginRequestDTO;
import com.cyberhackathon.model.LoginResponseDTO;
import com.cyberhackathon.repository.jpa.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {
    @Autowired
    private UserRepository userRepository;

    public LoginResponseDTO validateLoginCredentials(LoginRequestDTO request) {
        Optional<User> userOpt = userRepository.findByEmailAndPassword(
                request.getEmail(), request.getPassword()
        );

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            return new LoginResponseDTO(
                    user.getId(),
                    user.getRole().getRoleName().name(),
                    "Login successful"
            );
        } else {
            return new LoginResponseDTO(null, null, "Invalid email or password");
        }
    }
}
