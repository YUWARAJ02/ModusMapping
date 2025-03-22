package com.cyberhackathon.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "officers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Officer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "badge_number", nullable = false, unique = true)
    private String badgeNumber;

    @Column(nullable = false)
    private String department;
}

