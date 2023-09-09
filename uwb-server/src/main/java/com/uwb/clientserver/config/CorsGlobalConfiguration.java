package com.uwb.clientserver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.cors.CorsConfiguration;
@Configuration
public class CorsGlobalConfiguration {
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("*");
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        source.registerCorsConfiguration("/v3/api-docs", config);
        source.registerCorsConfiguration("/api/**", config);
        source.registerCorsConfiguration("/swagger-ui/**", config);
        return new CorsFilter(source);
    }
}