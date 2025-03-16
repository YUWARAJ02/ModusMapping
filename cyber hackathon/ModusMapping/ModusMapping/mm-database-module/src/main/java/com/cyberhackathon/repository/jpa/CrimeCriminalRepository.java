package com.cyberhackathon.repository.jpa;

import com.cyberhackathon.entity.CrimeCriminal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrimeCriminalRepository extends JpaRepository<CrimeCriminal, Long> {
}

