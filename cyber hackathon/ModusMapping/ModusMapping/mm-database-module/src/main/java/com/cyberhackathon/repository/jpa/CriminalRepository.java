package com.cyberhackathon.repository.jpa;

import com.cyberhackathon.entity.Criminal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CriminalRepository extends JpaRepository<Criminal, Long> {
    Optional<Criminal> findByName(String name);
}

