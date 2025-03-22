package com.cyberhackathon.repository.jpa;

import com.cyberhackathon.entity.Crime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CrimeRepository extends JpaRepository<Crime, Long> {

    @Query("SELECT DISTINCT c.crimeType FROM Crime c")
    List<String> findDistinctByCrimeType();
}

