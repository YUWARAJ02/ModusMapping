package com.cyberhackathon.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.coyote.ProtocolHandler;
import org.springframework.boot.web.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.Executors;

@Configuration
public class VirtualThreadConfig {

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory> tomcatCustomizer() {
        return factory -> factory.addConnectorCustomizers((TomcatConnectorCustomizer) connector -> {
            ProtocolHandler protocolHandler = connector.getProtocolHandler();
            if (protocolHandler instanceof org.apache.coyote.http11.Http11NioProtocol http11NioProtocol) {
                // Set a Virtual Thread Executor for handling requests
                http11NioProtocol.setExecutor(Executors.newVirtualThreadPerTaskExecutor());
            }
        });
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }
}
