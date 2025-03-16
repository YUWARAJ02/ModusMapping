package com.cyberhackathon.aspect;

import com.cyberhackathon.entity.Criminal;
import com.cyberhackathon.repository.neo4j.CriminalNeo4jRepository;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class DatabaseSyncAspect {

    private final CriminalNeo4jRepository neo4jRepository;

    public DatabaseSyncAspect(CriminalNeo4jRepository neo4jRepository) {
        this.neo4jRepository = neo4jRepository;
    }

    @AfterReturning(pointcut = "execution(* org.springframework.data.jpa.repository.JpaRepository.save(..))", returning = "savedEntity")
    public void syncToNeo4j(JoinPoint joinPoint, Object savedEntity) {
        if (savedEntity != null && savedEntity.getClass().getSimpleName().equals("Criminal")) {
            neo4jRepository.save((Criminal) savedEntity);
            log.info("✅ Synced {} to Neo4j!", savedEntity.getClass().getSimpleName());
        }
    }
}
