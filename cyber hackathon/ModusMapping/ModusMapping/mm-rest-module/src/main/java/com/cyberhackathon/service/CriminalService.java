package com.cyberhackathon.service;

import com.cyberhackathon.entity.Criminal;
import com.cyberhackathon.model.CriminalDTO;
import com.cyberhackathon.repository.jpa.CriminalRepository;
import com.cyberhackathon.repository.neo4j.CriminalNeo4jRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.core.Neo4jTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CriminalService {

    private final CriminalRepository criminalRepository;
    private final CriminalNeo4jRepository criminalNeo4jRepository;
    private final Neo4jTemplate neo4jTemplate;

    @Autowired
    public CriminalService(
            CriminalRepository criminalRepository,
            CriminalNeo4jRepository criminalNeo4jRepository,
            Neo4jTemplate neo4jTemplate) {
        this.criminalRepository = criminalRepository;
        this.criminalNeo4jRepository = criminalNeo4jRepository;
        this.neo4jTemplate = neo4jTemplate;
    }

    public List<CriminalDTO> getAllCriminals() {
        return criminalRepository.findAll()
                .stream()
                .map(CriminalDTO::new)
                .collect(Collectors.toList());
    }

    public Criminal saveCriminal(Criminal criminal) {
        return criminalRepository.save(criminal);
    }

    public List<Criminal> getCriminalNetwork() {
        return criminalNeo4jRepository.getCriminalNetwork();
        // OR if you want to use template:
        // return neo4jTemplate.findAll(Criminal.class);
    }
}
