package com.cyberhackathon.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "crimes")
public class Crime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "case_id", nullable = false)
    @Relationship(type = "PART_OF")
    private Case criminalCase;

    @Column(name = "crime_date", nullable = false)
    private Date crimeDate;

    @Column(name = "crime_type", nullable = false)
    private String crimeType;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToMany
    @JoinTable(
            name = "crime_criminal",
            joinColumns = @JoinColumn(name = "crime_id"),
            inverseJoinColumns = @JoinColumn(name = "criminal_id")
    )
    private Set<Criminal> criminals = new HashSet<>();

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCrimeType() {
        return crimeType;
    }

    public void setCrimeType(String crimeType) {
        this.crimeType = crimeType;
    }

    public Date getCrimeDate() {
        return crimeDate;
    }

    public void setCrimeDate(Date crimeDate) {
        this.crimeDate = crimeDate;
    }

    public Case getCriminalCase() {
        return criminalCase;
    }

    public void setCriminalCase(Case criminalCase) {
        this.criminalCase = criminalCase;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Criminal> getCriminals() {
        return criminals;
    }

    public void setCriminals(Set<Criminal> criminals) {
        this.criminals = criminals;
    }
}

