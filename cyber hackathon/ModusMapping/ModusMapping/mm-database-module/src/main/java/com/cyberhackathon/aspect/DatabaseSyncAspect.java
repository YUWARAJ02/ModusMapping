package com.cyberhackathon.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@Aspect
@Component
public class DatabaseSyncAspect {

    private final Map<Class<?>, Neo4jRepository<?, ?>> neo4jRepositories;

    public DatabaseSyncAspect(Map<Class<?>, Neo4jRepository<?, ?>> neo4jRepositories) {
        this.neo4jRepositories = neo4jRepositories;
    }

    @AfterReturning(pointcut = "execution(* com.cyberhackathon.repository.mysql.*.save(..))", returning = "savedEntity")
    @Transactional
    public void syncToNeo4j(JoinPoint joinPoint, Object savedEntity) {
        if (savedEntity == null) return;

        Class<?> entityClass = savedEntity.getClass();
        Neo4jRepository<Object, ?> neo4jRepository = (Neo4jRepository<Object, ?>) neo4jRepositories.get(entityClass);

        if (neo4jRepository != null) {
            neo4jRepository.save(savedEntity);
            System.out.println("✅ Synced {} with ID {} to Neo4j!"+ entityClass.getSimpleName()+ savedEntity.hashCode());
        } else {
            System.out.println(" No Neo4j repository found for {}. Skipping sync!"+ entityClass.getSimpleName());
        }
    }
}
