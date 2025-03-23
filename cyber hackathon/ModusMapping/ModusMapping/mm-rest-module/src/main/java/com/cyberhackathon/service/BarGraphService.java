package com.cyberhackathon.service;

import com.cyberhackathon.contract.dashboard.BarGraphData;
import com.cyberhackathon.repository.jpa.CrimeRepository;
import com.cyberhackathon.utils.Helper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BarGraphService {

    @Autowired
    private CrimeRepository crimeRepository;

    public List<BarGraphData> getBarGraphData(final String fromDate, final String toDate) throws ParseException {
        final Date from = Helper.getDate(fromDate);
        final Date to = Helper.getDate(toDate);
        var crimeList = crimeRepository.findCrimesGroupedByTypeAndLocation(from,to);
        return crimeList.stream().map(obj ->
                new BarGraphData(
                        obj[0].toString(),  // date
                        obj[1].toString(),  // location
                        obj[2].toString(),  // crimeType
                        (obj[3])// count (ensuring Integer type)
                )
        ).collect(Collectors.toList());
    }
}
