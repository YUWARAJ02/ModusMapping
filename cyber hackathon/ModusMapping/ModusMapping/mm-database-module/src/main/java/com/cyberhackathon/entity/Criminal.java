package com.cyberhackathon.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.neo4j.core.schema.Node;

import java.util.Date;

@Entity
@Table(name = "criminals")
@Node("Criminal")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Criminal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // JPA ID Generation
    @org.springframework.data.neo4j.core.schema.Id // Neo4j ID
    @org.springframework.data.neo4j.core.schema.GeneratedValue // Neo4j auto-generates ID
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCriminalHistory() {
        return criminalHistory;
    }

    public void setCriminalHistory(String criminalHistory) {
        this.criminalHistory = criminalHistory;
    }

    public Criminal(Long id, String name, String alias, Date dob, String phoneNumber, String address, String criminalHistory) {
        this.id = id;
        this.name = name;
        this.alias = alias;
        this.dob = dob;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.criminalHistory = criminalHistory;
    }
    public Criminal() {

    }
}

