package com.cyberhackathon.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "cases")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Case {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "case_number", nullable = false, unique = true)
    private String caseNumber;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CaseStatus status = CaseStatus.WAITING_FOR_APPROVAL;

    @ManyToOne
    @JoinColumn(name = "officer_id", nullable = false)
    private Officer officer;

    // ✅ Changed from List to Set to fix MultipleBagFetchException
    @OneToMany(mappedBy = "criminalCase", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Crime> crimes;

    @OneToMany(mappedBy = "criminalCase", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Evidence> evidence;

    public Set<Evidence> getEvidence() {
        return evidence;
    }

    public void setEvidence(Set<Evidence> evidence) {
        this.evidence = evidence;
    }

    private int year;
    private int month;

    public enum CaseStatus {
        OPEN, CLOSED, WAITING_FOR_APPROVAL
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCaseNumber() {
        return caseNumber;
    }

    public void setCaseNumber(String caseNumber) {
        this.caseNumber = caseNumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public CaseStatus getStatus() {
        return status;
    }

    public void setStatus(CaseStatus status) {
        this.status = status;
    }

    public Officer getOfficer() {
        return officer;
    }

    public void setOfficer(Officer officer) {
        this.officer = officer;
    }

    public Set<Crime> getCrimes() {
        return crimes;
    }

    public void setCrimes(Set<Crime> crimes) {
        this.crimes = crimes;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }
}


