package com.cyberhackathon.service;

import com.cyberhackathon.model.CrimesDTO;
import com.cyberhackathon.repository.jpa.CrimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CrimeDetailsService {
    @Autowired
    private CrimeRepository crimeRepository;

    public List<CrimesDTO> getAllCrimeDetails() {

        return crimeRepository.findAll().stream().map(crime -> new CrimesDTO(
                crime.getId(),
                crime.getCriminals().stream()
                        .map(c -> c.getName())  // Extract criminal names
                        .collect(Collectors.joining(" & more ")),
                crime.getCrimeType(),
                crime.getLocation(),
                crime.getCrimeDate().toString(),
                crime.getCriminalCase().getOfficer().getUser().getName()
        )).collect(Collectors.toList());
    }

}
