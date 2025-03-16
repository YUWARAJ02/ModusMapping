package com.cyberhackathon.repository.jpa;

import com.cyberhackathon.entity.Officer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfficerRepository extends JpaRepository<Officer, Long> {
}

