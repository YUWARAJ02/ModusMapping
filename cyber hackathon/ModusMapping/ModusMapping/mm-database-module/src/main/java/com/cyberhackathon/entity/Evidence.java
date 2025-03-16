package com.cyberhackathon.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "evidence")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evidence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "case_id", nullable = false)
    private Case criminalCase;

    @Column(name = "evidence_type", nullable = false)
    private String evidenceType;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "added_by", nullable = false)
    private User addedBy;
}

