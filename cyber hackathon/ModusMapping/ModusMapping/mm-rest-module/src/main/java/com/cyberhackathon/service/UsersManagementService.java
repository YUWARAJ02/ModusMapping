package com.cyberhackathon.service;

import com.cyberhackathon.entity.User;
import com.cyberhackathon.model.UsersDTO;
import com.cyberhackathon.repository.jpa.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsersManagementService {

    @Autowired
    private UserRepository usersRepository;

    public List<UsersDTO> getAllUsers() {
        List<User> users = usersRepository.findAllUsersWithRoles();
        return users.stream().map(user -> new UsersDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getRole().getRoleName().name()
        )).collect(Collectors.toList());
    }
}
