package com.uwb.clientserver.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ApplicationPaths {

    @Value("${application.backgroundPath}")
    private String backgroundPath;

    public String getBackgroundPath() {
        return backgroundPath;
    }
}
