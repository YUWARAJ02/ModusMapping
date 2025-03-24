package com.cyberhackathon.Controller;

import com.cyberhackathon.model.CrimesDTO;
import com.cyberhackathon.service.CrimeDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/crimes")
@CrossOrigin(origins = "http://localhost:3000")
public class CrimeDetailsController {
    @Autowired
    private CrimeDetailsService crimeService;

    @GetMapping("/details")
    public ResponseEntity<List<CrimesDTO>> getCrimeDetails() {
        List<CrimesDTO> crimeDetails = crimeService.getAllCrimeDetails();
        return ResponseEntity.ok(crimeDetails);
    }
}
