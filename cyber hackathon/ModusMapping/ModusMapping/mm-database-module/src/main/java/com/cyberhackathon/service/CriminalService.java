package com.cyberhackathon.service;

import com.cyberhackathon.entity.Criminal;
import com.cyberhackathon.repository.jpa.CriminalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CriminalService {

    @Autowired
    private CriminalRepository criminalRepository;

    public List<Criminal> getCriminalData() {
        return criminalRepository.findAll();
    }

}
