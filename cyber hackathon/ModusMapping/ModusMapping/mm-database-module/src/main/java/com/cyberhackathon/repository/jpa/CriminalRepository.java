package com.cyberhackathon.repository.jpa;

import com.cyberhackathon.entity.Criminal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CriminalRepository extends JpaRepository<Criminal, Long> {
}

