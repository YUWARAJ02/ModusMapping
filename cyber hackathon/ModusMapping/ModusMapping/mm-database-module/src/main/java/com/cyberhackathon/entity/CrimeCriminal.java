package com.cyberhackathon.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "crime_criminal")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrimeCriminal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "crime_id", nullable = false)
    private Crime crime;

    @ManyToOne
    @JoinColumn(name = "criminal_id", nullable = false)
    private Criminal criminal;
}

