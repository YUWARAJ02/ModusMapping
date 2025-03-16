package com.cyberhackathon.repository.neo4j;

import com.cyberhackathon.entity.Criminal;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CriminalNeo4jRepository extends Neo4jRepository<Criminal, Long> {

    // Custom query to fetch criminals involved in crimes
    @Query("MATCH (c:Criminal)-[:INVOLVED_IN]->(crime:Crime) RETURN c, crime")
    List<Criminal> findCriminalsWithCrimes();
}

