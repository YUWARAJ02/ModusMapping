package com.cyberhackathon.repository.jpa;

import com.cyberhackathon.entity.Crime;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository
public interface CrimeRepository extends JpaRepository<Crime, Long> {

    @Query("SELECT DISTINCT c.crimeType FROM Crime c")
    List<String> findDistinctByCrimeType();

    @Query("SELECT c.crimeDate, c.crimeType, c.location, COUNT(c) " +
            "FROM Crime c " +
            "WHERE c.crimeDate BETWEEN :startDate AND :endDate " +
            "GROUP BY c.crimeDate, c.crimeType, c.location")
    List<Object[]> findCrimesGroupedByTypeAndLocation(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate);


    @Query("SELECT c.crimeDate, c.location, COUNT(c) " +
            "FROM Crime c " +
            "WHERE c.crimeDate BETWEEN :startDate AND :endDate " +
            "GROUP BY c.crimeDate, c.location")
    List<Object[]> findCrimesGroupedByLocation(@Param("startDate") Date startDate,
                                               @Param("endDate") Date endDate);

    @Query("SELECT c " +
            "FROM Crime c " +
            "WHERE c.crimeDate BETWEEN :startDate AND :endDate ")
    List<Crime> findCrimesByOfficerAndCriminal(@Param("startDate") Date startDate,
                                          @Param("endDate") Date endDate);

    @EntityGraph(attributePaths = {"criminals", "criminalCase.officer.user"})
    List<Crime> findAll();
}

