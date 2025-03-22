package com.cyberhackathon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;

@SpringBootApplication
@EnableNeo4jRepositories(basePackages = "com.cyberhackathon.repository.neo4j")
@EnableAspectJAutoProxy
@EnableJpaRepositories(basePackages = "com.cyberhackathon.repository.jpa")
public class ModusMappingApplication {

    public static void main(String[] args) {
        SpringApplication.run(ModusMappingApplication.class, args);
    }

}
