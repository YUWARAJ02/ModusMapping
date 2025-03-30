package com.cyberhackathon.service;

import com.cyberhackathon.entity.Criminal;
import com.cyberhackathon.model.CriminalDTO;
import com.cyberhackathon.repository.jpa.CriminalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CriminalService {

    @Autowired
    private CriminalRepository criminalRepository;

    public List<CriminalDTO> getAllCriminals() {
        return criminalRepository.findAll()
                .stream()
                .map(CriminalDTO::new)
                .collect(Collectors.toList());
    }

    public Criminal saveCriminal(Criminal criminal) {
        return criminalRepository.save(criminal);
    }
}
