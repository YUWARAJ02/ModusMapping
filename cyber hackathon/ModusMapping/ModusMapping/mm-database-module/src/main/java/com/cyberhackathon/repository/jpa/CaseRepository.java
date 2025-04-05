package com.cyberhackathon.repository.jpa;

import com.cyberhackathon.entity.Case;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CaseRepository extends JpaRepository<Case, Long> {
    List<Case> findByOrderByYearDescMonthDesc();

    @Query("SELECT c FROM Case c " +
            "LEFT JOIN FETCH c.officer o " +
            "LEFT JOIN FETCH o.user u " +
            "LEFT JOIN FETCH c.crimes cr " +
            "LEFT JOIN FETCH cr.criminals crim " +
            "LEFT JOIN FETCH c.evidence e " +
            "WHERE c.id = :caseId")
    Optional<Case> findCaseReportById(Long caseId);
    List<Case> findByStatus(Case.CaseStatus status);

    Optional<Case> findByCaseNumber(String caseNum);

    Long countByStatus(Case.CaseStatus status);

    Optional<Case> findTopByOrderByIdDesc();
}
