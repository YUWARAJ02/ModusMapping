package com.cyberhackathon.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.Node;

import java.util.Date;

@Entity
@Table(name = "criminals")
@Node("Criminal")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Criminal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String alias;

    private Date dob;

    @Column(name = "phone_number")
    private String phoneNumber;

    private String address;

    @Column(name = "criminal_history")
    private String criminalHistory;
}

