package com.cyberhackathon.Controller;

import com.cyberhackathon.entity.Criminal;
import com.cyberhackathon.model.CriminalDTO;
import com.cyberhackathon.service.CriminalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CriminalController {

    @Autowired
    private CriminalService criminalService;

    @GetMapping("/criminals")
    public List<CriminalDTO> getAllCriminals() {
        return criminalService.getAllCriminals();
    }

    @PostMapping("/criminals")
    public ResponseEntity<Criminal> addCriminal(@RequestBody Criminal criminal) {
        Criminal savedCriminal = criminalService.saveCriminal(criminal);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCriminal);
    }

    @GetMapping("/criminals/network")
    public List<Criminal> getCriminalNetwork() {
        return criminalService.getCriminalNetwork();
    }
}
