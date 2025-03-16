package com.cyberhackathon.repository.jpa;

import com.cyberhackathon.entity.Evidence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvidenceRepository extends JpaRepository<Evidence, Long> {
}

