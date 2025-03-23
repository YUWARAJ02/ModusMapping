package com.cyberhackathon.Controller;

import com.cyberhackathon.contract.dashboard.BarGraphData;
import com.cyberhackathon.contract.dashboard.LineChart;
import com.cyberhackathon.contract.dashboard.PieChartData;
import com.cyberhackathon.service.GraphService;
import com.cyberhackathon.repository.jpa.CrimeRepository;
import com.cyberhackathon.service.CriminalService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashBoardController {

    @Autowired
    private CriminalService criminalService;

    @Autowired
    private CrimeRepository crimeRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private GraphService graphService;

    @GetMapping("criminal-type")
    @ResponseBody
    public ResponseEntity<?> getCriminalData() throws JsonProcessingException {

        return new ResponseEntity<>(crimeRepository.findDistinctByCrimeType(), HttpStatus.OK);
    }

    @GetMapping("/barGraphData")
    public ResponseEntity<List<BarGraphData>> getBarGraphData(@RequestParam final String fromDate, @RequestParam final String toDate) throws ParseException {
        return new ResponseEntity<>(graphService.getBarGraphData(fromDate,toDate),HttpStatus.OK);
    }

    @GetMapping("/lineChartData")
    public ResponseEntity<List<LineChart>> getLineChartData(@RequestParam final String fromDate, @RequestParam final String toDate) throws ParseException {
        return new ResponseEntity<>(graphService.getLineChartData(fromDate,toDate),HttpStatus.OK);
    }

    @GetMapping("/pieChartData")
    public ResponseEntity<List<PieChartData>> getPieChartData(@RequestParam final String fromDate, @RequestParam final String toDate) throws ParseException {
        return new ResponseEntity<>(graphService.getPieChartData(fromDate,toDate),HttpStatus.OK);
    }
}
