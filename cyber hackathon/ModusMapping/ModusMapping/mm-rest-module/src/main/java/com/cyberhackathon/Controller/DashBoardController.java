package com.cyberhackathon.Controller;

import com.cyberhackathon.entity.Crime;
import com.cyberhackathon.entity.Criminal;
import com.cyberhackathon.repository.jpa.CrimeRepository;
import com.cyberhackathon.service.CriminalService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
public class DashBoardController {

    @Autowired
    private CriminalService criminalService;

    @Autowired
    private CrimeRepository crimeRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    @ResponseBody
    public ResponseEntity<?> getCriminalData() throws JsonProcessingException {

        return new ResponseEntity<>(crimeRepository.findDistinctByCrimeType(), HttpStatus.OK);
    }
}
