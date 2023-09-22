package com.uwb.clientserver.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class ApplicationPaths {

    @Value("${application.backgroundPath}")
    private String backgroundPath;

    @Value("${application.objectIconPath}")
    private String objectIconPath;
}
