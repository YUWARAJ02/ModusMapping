package com.cyberhackathon.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "crimes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Crime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "case_id", nullable = false)
    private Case criminalCase;

    @Column(name = "crime_date", nullable = false)
    private Date crimeDate;

    @Column(name = "crime_type", nullable = false)
    private String crimeType;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;
}

